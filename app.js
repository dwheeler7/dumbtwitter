const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/user')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)

module.exports = app