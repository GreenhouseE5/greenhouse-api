'use strict'
const ModelsName = require('../models.enum')

module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define(
    ModelsName.CONNECTION,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user_id: DataTypes.STRING,
      socket_id: DataTypes.STRING,
      is_connected: DataTypes.BOOLEAN,
      is_active: DataTypes.STRING,
    },
    {
      defaultScope: {
        attributes: { exclude: ['is_active'] },
      }
    }
  )
  Connection.associate = (models) => {
    Connection.belongsTo(models.User, {
      as: 'client',
      foreignKey: 'user_id'
    })
  }
  return Connection
}
