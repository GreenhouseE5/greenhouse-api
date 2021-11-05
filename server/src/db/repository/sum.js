const Models = require('../models')

module.exports = ({ entity, field, condition, options = {} }) =>
  Models[entity].sum(field, condition, options)
