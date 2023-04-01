const { isArray } = require('@helpers/utils')

const single = (dataObj) => {
    return dataObj
}

const varied = (dataArr) => {
    return dataArr.map(single)
}

const serializer = (data) => {
    if (!data) {
        return null
    } else if (isArray(data)) {
        return { data: varied(data) }
    } else if (isArray(data.data)) {
        data.data = varied(data.data)
        return data
    } else {
        return { data: single(data) }
    }
}

module.exports = serializer
