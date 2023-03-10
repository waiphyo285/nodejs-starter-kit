const util = require('util')
const mongoose = require('mongoose')
const client = require('../connection')

client.hget = util.promisify(client.hget)
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function (options = { time: 60 }) {
    this.useCache = true
    this.time = options.time
    this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name)
    return this
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return await exec.apply(this, arguments)
    }

    const key = JSON.stringify({ ...this.getQuery() })

    const cacheValue = await client.hget(this.hashKey, key)

    const checkCache = (value, fnOne, fnTwo) =>
        value ? fnOne(JSON.parse(value)) : fnTwo()

    const existCache = (cache) =>
        Array.isArray(cache)
            ? cache.map((doc) => new this.model(doc))
            : new this.model(cache)

    const notExistCache = async (reponse) => {
        const result = await exec.apply(this, reponse)
        client.hset(this.hashKey, key, JSON.stringify(result))
        client.expire(this.hashKey, this.time)
        return result
    }

    const result = checkCache(
        cacheValue,
        (documents) => existCache(documents),
        () => notExistCache(arguments)
    )

    return result
}

module.exports = {
    clearKey(hashKey) {
        client.del(JSON.stringify(hashKey))
    },
}
