const HttpError = require('../tools/utils/httpError')
const { verifyToken } = require('../tools/utils/jwt')

const Guard =
  ({ mustBeOwner = false, reqProperty = '', attribute = '' }) =>
  async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const { iat, exp, ...user } = await verifyToken(token)
      req.headers.user = user
      if (mustBeOwner && !req[reqProperty][attribute])
        throw new HttpError(400, `${attribute} is required`)
      if (mustBeOwner && req[reqProperty][attribute] !== user.id)
        throw new HttpError(401, 'Permission denied')
      next()
    } catch (error) {
      next(error)
    }
  }

module.exports = Guard
