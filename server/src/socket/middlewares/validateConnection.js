const { clientConnectionSchm } = require('../../tools/schemas/socket')
const { verifyToken } = require('../../tools/utils/jwt')

const validateConnection = async (socket, next) => {
  const validation = clientConnectionSchm.validate(socket.handshake.query)
  if (validation.error) {
    const err = new Error(validation.error.details[0].message)
    return next(err)
  }
  const user = await verifyToken(socket.handshake.query.token)
  socket.handshake.query.user_id = user.id
  return next()
}

module.exports = validateConnection
