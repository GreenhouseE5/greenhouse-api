const Repository = require('../db/repository')
const { buildUserFilters } = require('../db/repository/buildFilters')
const ModelsName = require('../db/models.enum')
const { encrypt } = require('../tools/utils/encryption')

/**
 * @function create
 * @description Controller for POST /api/users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const create = async ({ body }, res, next) => {
  try {
    body.password = await encrypt(body.password)
    const user = await Repository.create({
      entity: ModelsName.USER,
      data: body,
    })
    res.status(201).json({ id: user.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function get
 * @description Controller for GET /api/users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const get = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    const users = await Repository.find({
      entity: ModelsName.USER,
      filters: buildUserFilters(filters),
      order,
      limit,
      offset,
    })
    res.status(200).json({
      data: users.rows,
      count: users.count,
      current: users.rows.length,
      offset,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOne
 * @description Controller for GET /api/users/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOne = async ({ params }, res, next) => {
  try {
    const user = await Repository.findOne({
      entity: ModelsName.USER,
      filters: { id: params.id, is_active: true },
    })
    res.status(200).json({ data: user || {}, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOne
 * @description Controller for GET /api/users/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

 const getMe = async ({ params, headers }, res, next) => {
  try {
    const user = await Repository.findOne({
      entity: ModelsName.USER,
      filters: { id: headers.user.id, is_active: true },
    })
    res.status(200).json({ data: user || {}, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function update
 * @description Controller for PUT /api/users/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const update = async ({ params, body }, res, next) => {
  try {
    if (body.password) body.password = await encrypt(body.password)
    await Repository.update({
      entity: ModelsName.USER,
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
 * @description Controller for DELETE /api/users/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const remove = async ({ params }, res, next) => {
  try {
    await Repository.update({
      entity: ModelsName.USER,
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
  getMe
}
