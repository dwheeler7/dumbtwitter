const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

// create
router.post('/', userController.createUser)
// login
router.post('/login', userController.loginUser)
// update
router.put('/:id', userController.auth, userController.updateUser)
// delete
router.delete('/:id', userController.auth, userController.deleteUser)
// show 
router.get('/:id', userController.showUser)

module.exports = router