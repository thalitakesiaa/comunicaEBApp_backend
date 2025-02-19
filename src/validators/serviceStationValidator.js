const Joi = require('joi');

const serviceStationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'O nome deve ser uma string.',
    'string.empty': 'O nome não pode estar vazio.',
    'string.min': 'O nome deve ter pelo menos 3 caracteres.',
    'string.max': 'O nome deve ter no máximo 100 caracteres.',
    'any.required': 'O nome é obrigatório.'
  }),
  description: Joi.string().max(255).allow(null, '').messages({
    'string.max': 'A descrição deve ter no máximo 255 caracteres.'
  }),
  area_id: Joi.number().integer().positive().required().messages({
    'number.base': 'O ID da área deve ser um número.',
    'number.integer': 'O ID da área deve ser um número inteiro.',
    'number.positive': 'O ID da área deve ser um número positivo.',
    'any.required': 'O ID da área é obrigatório.'
  })
});

module.exports = { serviceStationSchema };
