const Joi = require('joi')
const { createResponse } = require('@helpers/handlers/response')

const validateWare = (schema, property) => {
    return (req, res, next) => {
        const { error } = Joi.validate(req.body, schema)
        const locales = res.locals.i18n.translations

        const prev = () => {
            const { details } = error
            const message = details.map((i) => i.message).join(',')
            res.status(400).json(
                createResponse(400, { data: { message } }, locales)
            )
        }
        error === null ? next() : prev()
    }
}

module.exports = validateWare
