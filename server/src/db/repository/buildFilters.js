const { Op } = require('sequelize')

module.exports.buildUserFilters = (data) => {
  if (data.email) data.email = { [Op.substring]: data.email }
  if (data.firstname) data.firstname = { [Op.substring]: data.firstname }
  if (data.lastname) data.lastname = { [Op.substring]: data.lastname }
  data.is_active = true
  return data
}

module.exports.buildGHFilters = (data) => {
  if (data.name) data.name = { [Op.substring]: data.name }
  if (data.location) data.location = { [Op.substring]: data.location }
  data.is_active = true
  return data
}

module.exports.buildLogFilters = (data) => {
  if (data.name) data.name = { [Op.substring]: data.name }
  if (data.location) data.location = { [Op.substring]: data.location }
  data.is_active = true
  return data
}