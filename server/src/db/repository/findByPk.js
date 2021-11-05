const Models = require('../models')

module.exports = ({ entity, pk }) => Models[entity].findByPk(pk)
