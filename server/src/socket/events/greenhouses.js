const Repository = require('../../db/repository')
const ModelsName = require('../../db/models.enum')

const onConnection = async (socket) => {
  try {
    socket.on('sensor-data', async (body) => {
      const greenhouse = await Repository.findOne({
        entity: ModelsName.GREENHOUSE,
        filters: { id: body.greenhouse, is_active: true },
      })
      console.log(greenhouse)
      const client = await Repository.findOne({
        entity: ModelsName.CONNECTION,
        filters: { user_id: greenhouse.user_id, is_active: true },
      })
      if (client && client.is_connected) {
        global.sockets.client
          .to(client.socket_id)
          .emit('sensor-data', JSON.stringify(body))
      }
      await Repository.create({
        entity: ModelsName.SENSOR_LOGS,
        data: {
          greenhouse_id: body.greenhouse,
          temperature: body.temperature,
          humidity: body.humidity,
          date: body.date,
          time: body.time.replace(/:/g, ''),
        },
      })
    })
  } catch (error) {
    console.log('Error: ', error)
  }
}

module.exports = { onConnection }
