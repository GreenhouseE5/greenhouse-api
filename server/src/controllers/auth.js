const HttpError = require('../tools/utils/httpError')
const Repository = require('../db/repository/')
const ModelsName = require('../db/models.enum')
const { compare } = require('../tools/utils/encryption')
const { generateToken, verifyToken } = require('../tools/utils/jwt')
const { ConfigService, Constants } = require('../config')

const signin = async ({ body }, res, next) => {
  try {
    const { email, password } = body
    const user = await Repository.findOne({
      entity: ModelsName.USER,
      filters: { email, is_active: true },
      scope: 'withPassword',
    })
    if (!user)
      throw new HttpError(
        400,
        `The ${entity.options.name} ${column} does not exist`
      )
    const match = await compare(password, user.dataValues.password)
    if (!match) throw new HttpError(401, 'Invalid password')
    const accessToken = generateToken(
      user.dataValues,
      ConfigService.get(Constants.JWT_EXP_ACCESS_TKN)
    )
    const refresToken = generateToken(
      user.dataValues,
      ConfigService.get(Constants.JWT_EXP_REFRESH_TKN)
    )
    res.status(200).send({
      access_token: accessToken,
      refresh_token: refresToken,
    })
  } catch (error) {
    next(error)
  }
}

const refresh = async ({ body }, res, next) => {
  try {
    const data = await verifyToken(body.refresh_token)
    delete data.iat
    delete data.exp
    const accessToken = generateToken(
      data,
      ConfigService.get(Constants.JWT_EXP_ACCESS_TKN)
    )
    res.status(200).send({
      access_token: accessToken,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signin,
  refresh,
}
