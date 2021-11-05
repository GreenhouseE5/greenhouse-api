const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/logs', require('./logs'))
router.use('/greenhouses', require('./greenhouses'))
router.get('/', (req, res) => {
  res.send({ message: 'Home' })
})

module.exports = router
