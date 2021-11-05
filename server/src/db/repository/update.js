const Models = require('../models')

module.exports = ({ entity, filters, data, options = {} }) =>
  Models[entity].update(data, { where: filters, ...options })
