const Joi = require('joi')

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

const authorization = Joi.object({
  authorization: Joi.string()
  .regex(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/m)
  .required().messages({
    'string.pattern.base': 'Invalid Authorization header'
  }),
}).unknown(true)

module.exports = {
  login,
  authorization
}
