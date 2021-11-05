const { userConnectionSchm } = require('../../tools/schemas/socket')

const validateConnection = (socket, next) => {
  const validation = userConnectionSchm.validate(socket.handshake.query)
  if (validation.error) {
    const err = new Error(validation.error.details[0].message)
    return next(err)
  }
  return next()
}

module.exports = validateConnection
