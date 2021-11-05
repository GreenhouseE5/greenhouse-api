const express = require('express')
const router = express.Router()

const { validate, ifExist, isUnique } = require('../middlewares')
const {
  createSchm,
  getOneSchm,
  getSchm,
  updateSchm,
} = require('../tools/schemas/users')
const controllers = require('../controllers/users')
const ModelsName = require('../db/models.enum')
const { REQ_PROP } = require('./constants')

router.post(
  '/',
  validate(createSchm, REQ_PROP.BODY),
  isUnique({
    entity: ModelsName.USER,
    reqProperty: REQ_PROP.BODY,
    attribute: 'email',
  }),
  controllers.create
)
router.get('/', validate(getSchm, REQ_PROP.QUERY), controllers.get)
router.get('/:id', validate(getOneSchm, REQ_PROP.PARAMS), controllers.getOne)
router.delete(
  '/:id',
  validate(getOneSchm, REQ_PROP.PARAMS),
  ifExist({
    entity: ModelsName.USER,
    reqProperty: REQ_PROP.PARAMS,
    attribute: 'id',
  }),
  controllers.remove
)
router.put(
  '/:id',
  validate(getOneSchm, REQ_PROP.PARAMS),
  ifExist({
    entity: ModelsName.USER,
    reqProperty: REQ_PROP.PARAMS,
    attribute: 'id',
  }),
  validate(updateSchm, REQ_PROP.BODY),
  isUnique({
    entity: ModelsName.USER,
    reqProperty: REQ_PROP.BODY,
    attribute: 'email',
    required: false,
  }),
  controllers.update
)

module.exports = router
