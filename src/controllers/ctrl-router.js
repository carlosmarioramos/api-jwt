const pool = require('../db/pool')
const bcrypt = require('bcrypt')
const { genetareToken } = require('../middlewares/genetare-token')
const jwt = require('jsonwebtoken')

exports.root = (req, res) => {
  res.json({
    message: "Hola mundo"
  })
}

exports.signUp = async (req, res) => {
  const { email, password } = req.body

  const hash = await bcrypt.hash(password, 10)
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)'
  const params = [email, hash]

  try {
    await pool.query(sql, params)
    res.status(201)
    res.json({
      error: null,
      msg: "Usuario registrado exitosamente",
      data: null
    })
    return
  } catch (error) {
    res.status(403)
    res.json({
      error,
      msg: null,
      data: null
    })
  }
}

exports.signIn = async (req, res) => {
  const { email, password } = req.body
  const sql = 'SELECT * FROM users WHERE email = ?'
  const params = [email]

  try {
    const response = await pool.query(sql, params)
    const user = response.length > 0 ? response[0] : null

    if (!user) {
      res.status(401)
      res.json({
        error: "El usuario no está registrado",
        msg: null,
        data: null
      })

      return
    }

    const match = await bcrypt.compare(password, user.password) && email === user.email

    if (!match) {
      res.status(401)
      res.json({
        error: "Usuario o contraseña inválidos",
        msg: null,
        data: null
      })

      return
    }

    const token = await genetareToken(user)

    res.status(200)
    // res.setHeader('authorization', token)
    res.json({
      error: null,
      msg: "¡Sesión iniciada!",
      token
    })

    return
  } catch (error) {
    res.json({
      error,
      msg: null,
      data: null
    })

    return
  }
}

exports.home = async (req, res) => {
  res.json({ msg: "¡Sesión iniciada!" })
}