const Joi = require('joi');

const areaSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("").optional(),
});

const validateArea = (data) => {
  const { error } = areaSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = { validateArea };
