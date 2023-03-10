const fs = require('fs')
const os = require('os')
const _ = require('lodash')
const moment = require('moment')
const crypto = require('crypto')
const handle_tz = require('./config/time_zone')
const { mongoose } = require('@models/mongodb/connection')
const GenerateCode = require('@models/mongodb/schemas/generate_code')

/**
 * Utils Functions
 */

module.exports.isEmpty = function (val) {
    return _.isEmpty(val)
}

module.exports.isEmptyString = function (str) {
    return _.isEmpty(str)
}

module.exports.isEmptyNumber = function (num) {
    return _.isEmpty(num)
}

module.exports.isEmptyObject = function (obj) {
    return _.isEmpty(obj)
}

module.exports.isEmptyArray = function (arr) {
    return !_.isArray(arr)
}

module.exports.isArray = function (arr) {
    return _.isArray(arr)
}

module.exports.isEmail = function (email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return email.match(regex) ? true : false
}

module.exports.getTimeZone = function (utc = '+06:30') {
    return handle_tz.find((tz, idx) => tz.utc === utc)
}

module.exports.objectId = function () {
    const seconds = Math.floor(new Date() / 1000).toString(16)
    const machineId = crypto
        .createHash('md5')
        .update(os.hostname())
        .digest('hex')
        .slice(0, 6)
    const processId = process.pid.toString(16).slice(0, 4).padStart(4, '0')
    const counter = process
        .hrtime()[1]
        .toString(16)
        .slice(0, 6)
        .padStart(6, '0')
    return seconds + machineId + processId + counter
}

module.exports.urlEncode = function (text) {
    if (text == '') return text
    return text
        .replace(/%/g, '%25')
        .replace(/\n/g, '%0A')
        .replace(/\r/g, '%0D')
        .replace(/\s/g, '%20')
        .replace(/[#$&\+,/:;=\?@\[\]\"<>\\^`\{|\}]/g, function (x) {
            return '%' + x.charCodeAt(0).toString(16).toUpperCase()
        })
}

module.exports.urlDecode = function (text) {
    if (text == '') return text
    const exps = [
        /%0A/g,
        /%0D/g,
        /%20/g,
        /%23/g,
        /%24/g,
        /%25/g,
        /%26/g,
        /%2B/g,
        /%2C/g,
        /%2F/g,
        /%3A/g,
        /%3B/g,
        /%3D/g,
        /%3F/g,
        /%40/g,
        /%5B/g,
        /%5D/g,
        /%22/g,
        /%3C/g,
        /%3E/g,
        /%5E/g,
        /%60/g,
        /%7B/g,
        /%7C/g,
        /%7D/g,
    ]
    for (const i in exps) {
        text = text.replace(exps[i], function (x) {
            return String.fromCharCode(parseInt(x.substr(1), 16))
        })
    }
    return text
}

module.exports.nFormatter = function (num, digits) {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    const item = lookup
        .slice()
        .reverse()
        .find((item) => num >= item.value)
    return item
        ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
        : '0'
}

module.exports.toCamelCase = function (str) {
    return str
        .replace(/\s(.)/g, ($1) => $1.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, ($1) => $1.toLowerCase())
}

module.exports.toTitleCase = function (str, splitWith, joinWith) {
    return str
        .split(splitWith)
        .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(joinWith)
}

module.exports.getDateRange = async function (args) {
    return {
        $gte: args.gte
            ? new Date(moment(args.gte, ['DD/MM/YYYY']).format('YYYY-MM-D'))
            : new Date('1900-01-01'),
        $lte: args.lt
            ? new Date(moment(args.lt, ['DD/MM/YYYY']).format('YYYY-MM-D'))
            : new Date(),
    }
}

module.exports.removeImages = function (images) {
    let canDelete = true
    return new Promise((resolve, reject) => {
        if (images && images.length > 0) {
            images.map((file, Idx) => {
                fs.unlink('./public' + file.replace(/\\/g, '/'), (err) => {
                    if (err) console.error('File ', err), (canDelete = false)
                    else
                        console.log(`File ${file} is removed`),
                            (canDelete = true)
                })
            })
        }
        canDelete ? resolve() : reject()
    })
}

module.exports.generateCode = async function (args) {
    const { type, prefix = '' } = args
    const updateCode = await GenerateCode.findOneAndUpdate(
        { type, prefix },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
    )
    // return XXX-NNNNNNNN => INV-00000001 format
    return `${prefix}-${String(updateCode.count).padStart(8, '0')}`
}

module.exports.existRelation = async function (args) {
    const { model, key, value } = args
    const getModel = mongoose.model(model)
    const result = await getModel.findOne({ [key]: value }, { _id: 1 })
    return result
}

module.exports.getQueryParams = async function (args, words) {
    const { draw, columns, order, start, length, search, created_at } = args
    const sort = {}
    const filter = {}
    const w_regx = words
    const skip = parseInt(start) || 0
    let limit = parseInt(length) || 10

    if (limit === -1) {
        limit = undefined
    }

    if (created_at) {
        filter.created_at = await this.getDateRange(created_at)
    }

    if (order) {
        for (const i in order) {
            sort[columns[i].data] = order[i].dir === 'asc' ? 1 : -1
        }
    }

    if (search) {
        for (const i in w_regx) {
            const regx = new RegExp(
                search.value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
                'i'
            )
            w_regx[i] = { [w_regx[i]]: { $regex: regx } }
        }
    }

    return { filter, w_regx, sort, skip, limit, draw }
}
