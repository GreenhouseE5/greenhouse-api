const Joi = require('joi')
    .extend(require('@joi/date'));

const getOneSchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getSchm = Joi.object({
  greenhouse_id: Joi.string(),
  date: Joi.date().format('YYYY-MM-DD').utc(),
  time: Joi.date().format('HH:mm:ss').raw(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string().valid('id', 'greenhouse_id', 'date', 'createdAt').required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2),
})

const averageStatistics = Joi.object({
  analysisOf: Joi.string().valid('temperature', 'humidity'),
  condition: Joi.string().valid('date', 'time'),
  start: Joi.alternatives().conditional('condition', [
    {
      is: 'date',
      then: Joi.date().format('YYYY-MM-DD').utc(),
    },
    {
      is: 'time',
      then: Joi.date().format('HH:mm:ss').raw(),
    },
  ]),
  end: Joi.alternatives().conditional('condition', [
    {
      is: 'date',
      then: Joi.date().format('YYYY-MM-DD').utc().min(Joi.ref('start')),
    },
    {
      is: 'time',
      then: Joi.date().format('HH:mm:ss').raw().min(Joi.ref('start')),
    }
  ]),
})

module.exports = {
  getOneSchm,
  getSchm,
  averageStatistics,
}
