const Joi = require('joi')

const createSchm = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  location: Joi.string(),
  user_id: Joi.string().uuid(),
})

const updateSchm = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  location: Joi.string(),
})

const getOneSchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getSchm = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  location: Joi.string(),
  user_id: Joi.string().uuid(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string()
        .valid('id', 'name', 'description', 'location', 'user_id')
        .required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2),
})

module.exports = {
  createSchm,
  updateSchm,
  getOneSchm,
  getSchm,
}
