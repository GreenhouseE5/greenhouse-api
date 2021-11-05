const bcrypt = require('bcrypt')
const { ConfigService, Constants } = require('../../config')

module.exports = {
  encrypt: async (data) => {
    const salt = bcrypt.genSaltSync(
      parseInt(ConfigService.get(Constants.BCRYPT_HASH_ROUND))
    )
    return bcrypt.hash(data, salt)
  },
  compare: (plaintText, hash) => bcrypt.compare(plaintText, hash),
}
