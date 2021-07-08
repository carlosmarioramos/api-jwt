const mysql = require('mysql')
const { promisify } = require('util')
const keys = require('./keys')

const pool = mysql.createPool(keys)

pool.getConnection((error, connection) => {
  if (error) {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Conexión a base de datos cerrada')
			return
    }
    if (error.code === 'ER_CON_COUNT_ERROR') {
      console.error('La base de datos tiene muchas conexiones')
			return
    }
    if (error.code === 'ECONNREFUSED') {
      console.error('Conexión a base de datos rechazada')
			return
    }
  }

  if (!error && connection) {
		connection.release()
		console.log('DB is connected!')
		return
	}
})

pool.query = promisify(pool.query)

module.exports = pool