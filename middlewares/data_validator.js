const Joi = require("joi");
const { status, createResponse } = require("../helpers/handle_response");

const validateWare = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    const prev = () => {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(status[422].code).json(
        createResponse("ERROR", {
          data: { message },
        })
      );
    };
    error === null ? next() : prev();
  };
};

module.exports = validateWare;
