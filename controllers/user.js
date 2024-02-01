const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// authorization
exports.auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
      const data = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findOne({ _id: data._id })
      if (!user) {
        throw new Error()
      }
      req.user = user
      next()
    } catch (error) {
      res.status(401).send('Not authorized')
    }
  }

// create
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({ user, token })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
// login
exports.loginUser = async (req, res) => {
    try {        
        const user = await User.findOne({ email: req.body.email })
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            res.status(400).send('Invalid login credentials')
        } else {
            const token = await user.generateAuthToken()
            res.json({ user, token })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// update
exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const user = await User.findOne({ _id: req.params.id })
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        res.json(user)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// delete
exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.json({ message: 'User deleted' })
    } catch (err) {
        res.status(400).json({ message: err.message }) 
    }
}