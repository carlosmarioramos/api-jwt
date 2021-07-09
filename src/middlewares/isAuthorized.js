const jwt = require('jsonwebtoken')

exports.isAuthorized = async (req, res, next) => {
  const { authorization } = req.headers

  const token =
    authorization && authorization.toLowerCase().startsWith('bearer')
      ? authorization.split(' ')[1]
      : null

  const decodedToken = await jwt.verify(token, process.env.SECRET)
  console.log(decodedToken)

  if (!token || !decodedToken) {
    res.sendStatus(401)
    return
  }

  req.user = decodedToken
  return next()
}