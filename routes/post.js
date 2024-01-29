const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')
const { response } = require('../app')
const auth = require('../controllers/user').auth

router.use(auth)

//INDUCES

// Return a list of all posts
router.get('/', postController.index)


// Create a post
router.post('/', postController.createPost)

// Create a reply
router.post('/:parentId/reply', postController.createReply)

// Like a post
router.post('/:postId/like', postController.like)

// Update a post
router.put('/:id', postController.update)

// Delete a post
router.delete('/:id', postController.destroy)

// Show post
router.get('/:id', postController.show)



module.exports = router