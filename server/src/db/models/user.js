'use strict'
const ModelsName = require('../models.enum')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    ModelsName.USER,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN
    },
    {
      defaultScope: {
        attributes: { exclude: ['password', 'is_active'] }
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] }
        }
      }
    }
  )
  return User
}
