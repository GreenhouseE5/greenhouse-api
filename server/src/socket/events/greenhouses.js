const Repository = require('../../db/repository')
const ModelsName = require('../../db/models.enum')

const onConnection = async (socket) => {
  try {
    socket.on('sensor-data', async (body) => {
      const greenhouse = await Repository.findOne({
        entity: ModelsName.GREENHOUSE,
        filters: { id: body.greenhouse, is_active: true },
      })
      const client = await Repository.findOne({
        entity: ModelsName.CONNECTION,
        filters: { user_id: greenhouse.dataValues.user_id, is_active: true },
      })
      if (client && client.is_connected) {
        global.sockets.client
          .to(client.socket_id)
          .emit('sensor-data', JSON.stringify(body))
      }
      if (body.temperature && body.humidity)
        await Repository.create({
          entity: ModelsName.SENSOR_LOGS,
          data: {
            greenhouse_id: body.greenhouse,
            temperature: parseFloat(body.temperature),
            humidity: parseFloat(body.humidity),
            date: body.date,
            time: body.time,
          },
        })
    })
  } catch (error) {
    console.log('Error: ', error)
  }
}

module.exports = { onConnection }
