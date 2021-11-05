const jwt = require('jsonwebtoken')
const HttpError = require('./httpError')
const { ConfigService, Constants } = require('../../config')

/**
 * @function generateToken
 * @description Funtion to generate token
 * @param {Object} data Token payload
 * @param {Object} time Expiration time (in minutes)
 * @return {String} token
 */
const generateToken = (data, time = null) => {
  if (time) data.exp = Math.floor(Date.now() / 1000 + time * 60)
  return jwt.sign(data, ConfigService.get(Constants.JWT_SECRET))
}

/**
 * @function verifyToken
 * @description Funtion to verify token
 * @param {Object} data Token payload
 * @return {String} Promise
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, ConfigService.get(Constants.JWT_SECRET))
  } catch (error) {
    throw new HttpError(401, 'La sesión no es válida', {
      field: ['headers', 'Authorization'],
      value: token,
    })
  }
}

module.exports = {
  generateToken,
  verifyToken,
}
