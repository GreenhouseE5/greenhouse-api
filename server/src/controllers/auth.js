const HttpError = require('../tools/utils/httpError')
const Repository = require('../db/repository/')
const ModelsName = require('../db/models.enum')
const { compare } = require('../tools/utils/encryption')
const { generateToken } = require('../tools/utils/jwt')
const { ConfigService, Constants } = require('../config')

const signin = async ({ body }, res, next) => {
  try {
    const user = await Repository.findOne({
      entity: ModelsName.USER,
      filters: { email: body.email, is_active: true },
      scope: 'withPassword',
    })
    if (!user) throw new HttpError(400, `Invalid email`)
    const match = await compare(body.password, user.dataValues.password)
    if (!match) throw new HttpError(401, 'Invalid password')
    const { password, ...tokenPayload } = user.dataValues
    const token = generateToken(
      tokenPayload,
      ConfigService.get(Constants.JWT_EXP_REFRESH_TKN)
    )
    res.status(200).send({
      message: 'Success',
      token,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signin
}
