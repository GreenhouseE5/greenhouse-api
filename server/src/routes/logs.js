const express = require('express')
const router = express.Router()

const { validate, ifExist } = require('../middlewares')
const schemas = require('../tools/schemas/sensor-logs')
const controllers = require('../controllers/sensor-logs')
const ModelsName = require('../db/models.enum')
const { REQ_PROP } = require('./constants')

router.get('/', validate(schemas.getSchm, REQ_PROP.QUERY), controllers.get)
router.get(
  '/statistics/average',
  validate(schemas.averageStatistics, REQ_PROP.QUERY),
  controllers.getAverage
)
router.get(
  '/:id',
  validate(schemas.getOneSchm, REQ_PROP.PARAMS),
  controllers.getOne
)
router.delete(
  '/:id',
  validate(schemas.getOneSchm, REQ_PROP.PARAMS),
  ifExist({
    entity: ModelsName.SENSOR_LOGS,
    reqProperty: REQ_PROP.PARAMS,
    attribute: 'id',
  }),
  controllers.remove
)

module.exports = router
