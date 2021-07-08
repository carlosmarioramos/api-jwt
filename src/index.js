require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes
app.use('/api', require('./routes'))

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')} http://localhost:${app.get('port')}/api`)
})