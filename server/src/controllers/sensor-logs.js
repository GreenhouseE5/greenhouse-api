const Repository = require('../db/repository')
const { buildLogFilters } = require('../db/repository/buildFilters')
const ModelsName = require('../db/models.enum')
const { Op } = require('sequelize')
const sequelize = require('sequelize')

/**
 * @function get
 * @description Controller for GET /api/logs
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const get = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    const logs = await Repository.find({
      entity: ModelsName.SENSOR_LOGS,
      filters: buildLogFilters(filters),
      order,
      limit,
      offset,
    })
    res.status(200).json({
      data: logs.rows,
      count: logs.count,
      current: logs.rows.length,
      offset,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOne
 * @description Controller for GET /api/logs/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOne = async ({ params }, res, next) => {
  try {
    const log = await Repository.findOne({
      entity: ModelsName.SENSOR_LOGS,
      filters: { id: params.id, is_active: true },
    })
    res.status(200).json({ data: log || {}, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function remove
 * @description Controller for DELETE /api/logs/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const remove = async ({ params }, res, next) => {
  try {
    await Repository.update({
      entity: ModelsName.SENSOR_LOGS,
      filters: { id: params.id },
      data: { is_active: false },
    })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function get
 * @description Controller for GET /api/logs
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getAverage = async ({ query }, res, next) => {
  try {
    const { analysisOf = 'temperature', condition = 'time' } = query
    const logs = await Repository.find({
      entity: ModelsName.SENSOR_LOGS,
      filters: {},
      offset: 0,
      limit: null,
      order: ['id', 'ASC'],
      filters: { [condition]: { [Op.gte]: query.start, [Op.lte]: query.end } },
    })
    const avg = logs.rows.reduce((sum, item) => sum + item[analysisOf], 0)
    res.status(200).json({
      data: {
        analysisOf,
        condition,
        average: avg / logs.count,
        start: query.start,
        end: query.end,
      },
      count: logs.count,
      current: 1,
      offset: 0,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  get,
  getOne,
  remove,
  getAverage,
}
