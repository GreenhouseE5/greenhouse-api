const HttpError = require('../tools/utils/httpError')
const { findOne } = require('../db/repository')

const IsUnique =
  ({ entity, reqProperty, attribute, required = true, column = attribute }) =>
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
        console.log(result);
        if (result)
          throw new HttpError(400, `${attribute} must be unique for entity`)
      }
      next()
    } catch (error) {
      next(error)
    }
  }

module.exports = IsUnique
