const express = require('express')
const router = express.Router()

const { validate, ifExist, isUnique, Guard } = require('../middlewares')
const ghSchemas = require('../tools/schemas/greenhouses')
const authSchms = require('../tools/schemas/auth')
const controllers = require('../controllers/greenhouses')
const ModelsName = require('../db/models.enum')
const { REQ_PROP } = require('./constants')

router.post(
  '/',
  validate(authSchms.authorization, REQ_PROP.HEADERS),
  Guard({
    mustBeOwner: true,
    reqProperty: REQ_PROP.BODY,
    attribute: 'user_id',
  }),
  validate(ghSchemas.createSchm, REQ_PROP.BODY),
  isUnique({
    entity: ModelsName.GREENHOUSE,
    reqProperty: REQ_PROP.BODY,
    attribute: 'name',
  }),
  ifExist({
    entity: ModelsName.USER,
    reqProperty: REQ_PROP.BODY,
    attribute: 'user_id',
    column: 'id',
  }),
  controllers.create
)
router.get(
  '/',
  validate(authSchms.authorization, REQ_PROP.HEADERS),
  Guard({}),
  validate(ghSchemas.getSchm, REQ_PROP.QUERY),
  controllers.get
)
router.get(
  '/:id',
  validate(authSchms.authorization, REQ_PROP.HEADERS),
  Guard({}),
  validate(ghSchemas.getSchm, REQ_PROP.PARAMS),
  controllers.getOne
)
router.delete(
  '/:id',
  validate(authSchms.authorization, REQ_PROP.HEADERS),
  Guard({}),
  validate(ghSchemas.getOneSchm, REQ_PROP.PARAMS),
  ifExist({
    entity: ModelsName.GREENHOUSE,
    reqProperty: REQ_PROP.PARAMS,
    attribute: 'id',
  }),
  controllers.remove
)
router.put(
  '/:id',
  validate(authSchms.authorization, REQ_PROP.HEADERS),
  Guard({}),
  validate(ghSchemas.getOneSchm, REQ_PROP.PARAMS),
  ifExist({
    entity: ModelsName.GREENHOUSE,
    reqProperty: REQ_PROP.PARAMS,
    attribute: 'id',
  }),
  validate(ghSchemas.updateSchm, REQ_PROP.BODY),
  isUnique({
    entity: ModelsName.GREENHOUSE,
    reqProperty: REQ_PROP.BODY,
    attribute: 'name',
    required: false,
  }),
  controllers.update
)

module.exports = router
