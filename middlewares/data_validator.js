const Joi = require("joi");
const { status, createResponse } = require("../helpers/handle_response");

const validateWare = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    const prev = () => {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      const handle_response = createResponse("ERROR", {
        data: { message },
      });
      res.status(status[422].code).json(handle_response);
    };
    error === null ? next() : prev();
  };
};

module.exports = validateWare;
