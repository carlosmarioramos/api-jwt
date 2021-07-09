const pool = require('../db/pool')
const bcrypt = require('bcrypt')
const { genetareToken } = require('../middlewares/genetare-token')
const jwt = require('jsonwebtoken')

exports.root = (req, res) => {
  res.json({
    message: "Hola mundo"
  })
}

exports.sigUp = async (req, res) => {
  let { email, password, confirmPassword } = req.body
  email = email.trim()

  const match = password === confirmPassword

  if (!match) {
    res.status(401)
    res.json({
      error: "Las contraseñas no coinciden",
      msg: null,
      data: null
    })

    return
  }

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
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(401)
      res.json({
        error: "Usuario existente",
        msg: null,
        data: null
      })

      return new Error(error)
    }
  }
}

exports.sigIn = async (req, res) => {
  let { email, password } = req.body
  email = email.trim()
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
    res.setHeader('authorization', token)
    res.json({
      error: null,
      msg: "¡Usuario logueado!",
      token
    })

    return
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

exports.home = async (req, res) => {
  res.json({ msg: "¡Sesión iniciada!" })
}