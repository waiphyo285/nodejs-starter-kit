const redis = require('redis')
const config = require('@config')

const client = redis.createClient({
    host: config.REDIS.HOST,
    port: config.REDIS.PORT,
    // password: config.REDIS.PASS,
    retry_strategy: () => 1000,
})

module.exports = client
