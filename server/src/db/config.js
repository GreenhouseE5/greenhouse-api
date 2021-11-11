const { ConfigService, Constants } = require('../config')

module.exports = {
  development: {
    username: ConfigService.get(Constants.DB_USERNAME),
    password: ConfigService.get(Constants.DB_PASSWORD),
    database: ConfigService.get(Constants.DB_NAME),
    host: ConfigService.get(Constants.DB_HOST),
    dialect: 'postgres',
    port: ConfigService.get(Constants.DB_PORT),
    logging: false
  },
  test: {
    username: ConfigService.get(Constants.DB_USERNAME),
    password: ConfigService.get(Constants.DB_PASSWORD),
    database: ConfigService.get(Constants.DB_NAME),
    host: ConfigService.get(Constants.DB_HOST),
    dialect: 'postgres',
    port: ConfigService.get(Constants.DB_PORT),
    logging: false
  },
  production: {
    username: ConfigService.get(Constants.DB_USERNAME),
    password: ConfigService.get(Constants.DB_PASSWORD),
    database: ConfigService.get(Constants.DB_NAME),
    host: ConfigService.get(Constants.DB_HOST),
    dialect: 'postgres',
    port: ConfigService.get(Constants.DB_PORT)
  }
}
