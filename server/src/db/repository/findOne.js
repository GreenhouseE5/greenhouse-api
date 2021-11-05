const Models = require('../models')

module.exports = ({
  entity,
  filters,
  scope = 'defaultScope',
  include = [],
  options = {},
}) => Models[entity].scope(scope).findOne({ where: filters, include }, options)
