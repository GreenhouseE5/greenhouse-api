const Joi = require('joi')

const authSchm = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

module.exports = {
  authSchm
}
