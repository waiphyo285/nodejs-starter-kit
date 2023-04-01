const single = (dataObj) => {
    // prevent key
    return dataObj
}

const serializer = (data) => {
    if (!data) {
        return null
    } else if (Array.isArray(data.data)) {
        return {
            ...data,
            data: data.data.map(single),
        }
    } else {
        return { data: single(data) }
    }
}

module.exports = serializer
