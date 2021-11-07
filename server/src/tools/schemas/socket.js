const Joi = require('joi')

const clientConnectionSchm = Joi.object({
  client: Joi.string().uuid().required()
}).unknown(true)

const getDataBody = Joi.object({
  greenhouse: Joi.string().uuid().required(),
  data: Joi.object({
    hum: Joi.string(),
    temp: Joi.number()
  }).required(),
  date: Joi.date().required()
})

module.exports = {
  clientConnectionSchm,
  getDataBody
}
