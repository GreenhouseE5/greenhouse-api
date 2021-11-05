const Joi = require('joi')

const createSchm = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required()
})

const updateSchm = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8),
  firstname: Joi.string(),
  lastname: Joi.string()
})

const getOneSchm = Joi.object({
  id: Joi.string().uuid().required()
})

const getSchm = Joi.object({
  email: Joi.string(),
  firstname: Joi.string(),
  lastname: Joi.string(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string().valid('id', 'email', 'firstname', 'lastname').required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2)
})

module.exports = {
  createSchm,
  updateSchm,
  getOneSchm,
  getSchm
}