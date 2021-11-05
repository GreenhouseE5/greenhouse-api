const Models = require('../models')

module.exports = ({ entity, data, options = {} }) =>
  Models[entity].create(data, options)
