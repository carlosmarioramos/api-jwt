const jwt = require('jsonwebtoken')

exports.genetareToken = async user => {
  delete user.password
  user.date ? delete user.date : null
  const token = await jwt.sign({ user }, process.env.SECRET)
  return token
}