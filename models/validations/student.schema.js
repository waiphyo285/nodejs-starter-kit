const Joi = require('joi')

module.exports = Joi.object()
    .keys({
        name: Joi.string()
            .required()
            .error(() => 'must have name as string'),
        age: Joi.number().error(() => 'age must be a number'),
        grade: Joi.number().error(() => 'grade must be a number'),
    })
    .unknown(true)
