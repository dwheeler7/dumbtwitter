const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

module.exports = app