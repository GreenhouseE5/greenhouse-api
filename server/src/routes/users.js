const express = require('express')
const router = express.Router()

const { validate, ifExist, isUnique, Guard } = require('../middlewares')
const userSchms = require('../tools/schemas/users')
const authSchms = require('../tools/schemas/auth')
const controllers = require('../controllers/users')
const ModelsName = require('../db/models.enum')
const { REQ_PROP } = require('./constants')

router.post(
  '/',
  validate(userSchms.createSchm, REQ_PROP.BODY),
  isUnique({
    entity: ModelsName.USER,
    reqProperty: REQ_PROP.BODY,
    attribute: 'email',
  }),
  controllers.create
)
router.get(
  '/',
  validate(authSchms.authorization, REQ_PROP.HEADERS),
  Guard({}),
  validate(userSchms.getSchm, REQ_PROP.QUERY),
  controllers.get
)
router.get(
  '/me',
  validate(authSchms.authorization, REQ_PROP.HEADERS),
  Guard({}),
  controllers.getMe
)
router.get(
  '/:id',
  validate(authSchms.authorization, REQ_PROP.HEADERS),
  Guard({
    mustBeOwner: true,
    reqProperty: REQ_PROP.PARAMS,
    attribute: 'id'
  }),
  validate(userSchms.getOneSchm, REQ_PROP.PARAMS),
  controllers.getOne
)
router.delete(
  '/:id',
  validate(authSchms.authorization, REQ_PROP.HEADERS),
  Guard({
    mustBeOwner: true,
    reqProperty: REQ_PROP.PARAMS,
    attribute: 'id'
  }),
  validate(userSchms.getOneSchm, REQ_PROP.PARAMS),
  ifExist({
    entity: ModelsName.USER,
    reqProperty: REQ_PROP.PARAMS,
    attribute: 'id',
  }),
  controllers.remove
)
router.put(
  '/:id',
  validate(authSchms.authorization, REQ_PROP.HEADERS),
  Guard({
    mustBeOwner: true,
    reqProperty: REQ_PROP.PARAMS,
    attribute: 'id'
  }),
  validate(userSchms.getOneSchm, REQ_PROP.PARAMS),
  ifExist({
    entity: ModelsName.USER,
    reqProperty: REQ_PROP.PARAMS,
    attribute: 'id',
  }),
  validate(userSchms.updateSchm, REQ_PROP.BODY),
  isUnique({
    entity: ModelsName.USER,
    reqProperty: REQ_PROP.BODY,
    attribute: 'email',
    required: false,
  }),
  controllers.update
)

module.exports = router
