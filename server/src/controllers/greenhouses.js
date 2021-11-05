const Repository = require('../db/repository')
const { buildGHFilters } = require('../db/repository/buildFilters')
const ModelsName = require('../db/models.enum')

/**
 * @function create
 * @description Controller for POST /api/greenhouses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const create = async ({ body }, res, next) => {
  try {
    const greenhouse = await Repository.create({
      entity: ModelsName.GREENHOUSE,
      data: body,
    })
    res.status(201).json({ id: greenhouse.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function get
 * @description Controller for GET /api/greenhouses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const get = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    const greenhouses = await Repository.find({
      entity: ModelsName.GREENHOUSE,
      filters: buildGHFilters(filters),
      order,
      limit,
      offset,
    })
    res.status(200).json({
      data: greenhouses.rows,
      count: greenhouses.count,
      current: greenhouses.rows.length,
      offset,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOne
 * @description Controller for GET /api/greenhouses/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOne = async ({ params }, res, next) => {
  try {
    const greenhouse = await Repository.findOne({
      entity: ModelsName.GREENHOUSE,
      filters: { id: params.id, is_active: true },
    })
    res.status(200).json({ data: greenhouse || {}, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function update
 * @description Controller for PUT /api/greenhouses/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const update = async ({ params, body }, res, next) => {
  try {
    await Repository.update({
      entity: ModelsName.GREENHOUSE,
      filters: { id: params.id },
      data: body,
    })
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function remove
 * @description Controller for DELETE /api/greenhouses/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const remove = async ({ params }, res, next) => {
  try {
    await Repository.update({
      entity: ModelsName.GREENHOUSE,
      filters: { id: params.id },
      data: { is_active: false },
    })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  create,
  get,
  getOne,
  update,
  remove,
}
