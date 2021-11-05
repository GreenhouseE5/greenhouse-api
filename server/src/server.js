'use strict'
const app = require('./app')
const { ConfigService, Constants } = require('./config')
const validateConnection = require('./socket/middlewares/validateConnection')
const clientEvents = require('./socket/events/client')
const greenhouseEvents = require('./socket/events/greenhouses')
const SERVER_PORT = ConfigService.get(Constants.SERVER_PORT) || 5000

// Start server
const server = app.listen(SERVER_PORT, () => {
  console.log(`API REST running on http://localhost:${SERVER_PORT}`)
})

// Socket
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
  }
})

const greenhouses = io.of('greenhouses')
greenhouses.on('connection', greenhouseEvents.onConnection)

const client = io.of('client')
client.use(validateConnection)
client.on('connection', clientEvents.onConnection)

global.sockets = {
  greenhouses,
  client
}