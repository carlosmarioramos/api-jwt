const jwt = require('jsonwebtoken')

exports.isAuthorized = async (req, res, next) => {
  const { authorization } = req.headers

  const token =
    authorization && authorization.toLowerCase().startsWith('bearer')
      ? authorization.split(' ')[1]
      : null

  try {
    if (!token) return res.sendStatus(403)
    const decodedToken = await jwt.verify(token, process.env.SECRET)
    res.user = decodedToken
    next()
  } catch (error) {
    res.sendStatus(403)
    return new Error(error)
  }
}