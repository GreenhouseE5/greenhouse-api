const express = require('express')
const router = express.Router()

const { validate } = require('../middlewares')
const { authSchm } = require('../tools/schemas/auth')
const { signin } = require('../controllers/auth')
const { REQ_PROP } = require('./constants')

router.post(
  '/signin',
  validate(authSchm, REQ_PROP.BODY),
  signin
)

module.exports = router