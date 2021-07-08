const pool = require('../db/pool')

exports.root = (req, res) => {
  res.json({
    message: "Hola mundo"
  })
}