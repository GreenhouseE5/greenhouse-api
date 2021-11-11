const express = require('express')
const router = express.Router()

const { validate } = require('../middlewares')
const authSchms = require('../tools/schemas/auth')
const { signin } = require('../controllers/auth')
const { REQ_PROP } = require('./constants')

router.post(
  '/signin',
  validate(authSchms.login, REQ_PROP.BODY),
  signin
)

module.exports = router