const Models = require('../models')

module.exports = ({ entity, filter = {} }) =>
  Models[entity].destroy({ where: filter })
