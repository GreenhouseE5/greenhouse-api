const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const Constants = require('./constants')

class ConfigService {
  constructor() {
    if (ConfigService.instance) return ConfigService.instance
    this.envConfig = {}
    const { NODE_ENV = 'development' } = process.env
    let envFileVersion = '.env'
    if (NODE_ENV !== 'development') envFileVersion = `.env.${NODE_ENV}`
    const envFilePath = path.join(__dirname, `../../${envFileVersion}`)
    const existsPath = fs.existsSync(envFilePath)
    if (!existsPath) {
      console.error(`${envFileVersion} file not exists`)
      process.exit(0)
    }
    dotenv.config({ path: envFilePath })
    Object.values(Constants).forEach((value) => {
      this.envConfig[value] = process.env[value]
    })
    ConfigService.instance = this
  }

  get(key) {
    return this.envConfig[key]
  }
}
const instance = new ConfigService()
Object.freeze(instance)

module.exports = { ConfigService: instance, Constants }
