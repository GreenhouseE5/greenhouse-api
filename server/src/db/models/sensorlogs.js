'use strict'
const ModelsName = require('../models.enum')

module.exports = (sequelize, DataTypes) => {
  const SensorLogs = sequelize.define(
    ModelsName.SENSOR_LOGS,
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      greenhouse_id: DataTypes.UUID,
      is_active: DataTypes.BOOLEAN,
      temperature: DataTypes.FLOAT,
      humidity: DataTypes.FLOAT,
      time: DataTypes.TIME,
      date: DataTypes.DATEONLY
    },
    {
      defaultScope: {
        attributes: { exclude: ['is_active'] }
      },
    }
  )

  SensorLogs.associate = (models) => {
    SensorLogs.belongsTo(models.Greenhouse, {
      as: 'greenhouse',
      foreignKey: 'greenhouse_id'
    })
  }
  return SensorLogs
}
