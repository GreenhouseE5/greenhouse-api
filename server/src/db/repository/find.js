const Models = require('../models')

module.exports = ({
  entity,
  filters,
  order,
  limit,
  offset,
  include = [],
  options = {},
}) =>
  Models[entity].findAndCountAll({
    where: filters,
    order: [order],
    limit,
    offset,
    include,
    ...options,
  })
