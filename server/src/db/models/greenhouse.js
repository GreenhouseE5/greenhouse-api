'use strict'
const ModelsName = require('../models.enum')

module.exports = (sequelize, DataTypes) => {
  const Greenhouse = sequelize.define(
    ModelsName.GREENHOUSE,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      user_id: DataTypes.UUID,
      is_active: DataTypes.BOOLEAN,
    },
    {
      defaultScope: {
        attributes: { exclude: ['is_active'] },
      }
    }
  )
  Greenhouse.associate = (models) => {
    Greenhouse.belongsTo(models.User, {
      as: 'owner',
      foreignKey: 'user_id'
    })
  }
  return Greenhouse
}
