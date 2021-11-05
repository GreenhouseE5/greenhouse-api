const HttpError = require('../tools/utils/httpError')
const { findOne } = require('../db/repository')

const IfExist =
  ({ entity, reqProperty, attribute, required, column = attribute }) =>
  async (req, res, next) => {
    try {
      const field = req[reqProperty][attribute]
      if (!field && required)
        throw new HttpError(400, `${attribute} is required`)
      if (field) {
        const result = await findOne({
          entity,
          filters: { [column]: field },
        })
        if (!result)
          throw new HttpError(
            400,
            `The ${entity.options.name} ${column} does not exist`
          )
      }
      next()
    } catch (error) {
      next(error)
    }
  }

module.exports = IfExist
