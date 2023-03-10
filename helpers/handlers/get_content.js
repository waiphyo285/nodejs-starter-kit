const path = require('path')
const config = require('@config/index')

const DEF_LANG = config.APP.DEF_LANG

const getContentPath = (pageName) => {
    return `../../config/contents/${pageName}.json`
}

const extractData = (content, keys) => {
    let modKeys = keys
    let modContent = content[modKeys[0]]

    if (modKeys.length > 1) {
        modKeys.shift()
        return extractData(modContent, modKeys)
    } else {
        return modContent
    }
}

const getContent = (locale = DEF_LANG, pageName, keys) => {
    const pageContent = path.resolve(__dirname, getContentPath(pageName))
    const jsonContent = JSON.parse(JSON.stringify(require(pageContent)))
    return extractData(jsonContent, [locale, ...keys])
}

module.exports = { getContent }
