const Repository = require('../../db/repository')
const ModelsName = require('../../db/models.enum')

const onConnection = async (socket) => {
  try {
    const user_id = socket.handshake.query.user_id
    const client = await Repository.findOne({
      entity: ModelsName.CONNECTION,
      filters: { user_id, is_active: true },
    })
    if (!client) {
      await Repository.create({
        entity: ModelsName.CONNECTION,
        data: {
          user_id,
          socket_id: socket.id,
          is_connected: true,
        },
      })
    } else {
      await Repository.update({
        entity: ModelsName.CONNECTION,
        filters: { user_id },
        data: {
          socket_id: socket.id,
          is_connected: true,
        },
      })
    }
    socket.once('disconnect', async () => {
      await Repository.update({
        entity: ModelsName.CONNECTION,
        filters: { socket_id: socket.id },
        data: {
          is_connected: false,
        },
      })
    })
  } catch (error) {
    console.log('Error: ', error)
  }
}

module.exports = { onConnection }
