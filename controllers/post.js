const Post = require('../models/post')
const User = require('../models/user')

// index posts
exports.index = async (req, res) => {
    try {        
        const foundPosts = await Post.find({})
        res.status(200).json(foundPosts)
    } catch (err) {
        res.status(400).json({ message: 'Could not get posts', details: err.message })
    }
}

//indexUserPosts
// exports.indexUserPosts = async (req, res) => {
//     try {
//         const foundUser = await User.findOne({ _id: req.params.userId }).populate('posts')
//         res.status(200).json(foundUser.posts)
//     } catch (err) {
//         res.status(400).json({ message: `Could not get posts for the user with the ID, ${req.params.userId}`, details: err.message })
//     }
// }

// create post
exports.createPost = async (req, res) => {
    try {                       
        const newPost = new Post(req.body)
        await newPost.save()
        newPost.author = req.user._id
        await newPost.save()
        req.user.posts.push(newPost._id)
        await req.user.save()
        res.status(200).json({newPost, user: req.user })
    } catch (err) {
        res.status(400).json({ message: 'Could not add post to database', details: err.message })
    }
}

// create reply
exports.createReply = async (req, res) => {
    try {                                    
        const parentPost = await Post.findOne({ _id: req.params.parentId })        
        if (!parentPost) throw new Error('Could not get parent post')        
        if (parentPost.isReply) throw new Error ('Users cannot reply to a reply')        
        const reply = new Post(req.body)
        reply.isReply = true
        reply.author = req.user._id
        reply.parentPost = parentPost._id
        await reply.save()                        
        parentPost.replies.push(reply._id)
        await parentPost.save()        
        res.status(200).json({reply, parentPost})
    } catch (err) {
        res.status(400).json({ message: 'Could not create a reply', details: err.message })
    }
}

// like post
exports.like = async (req, res) => {
    try {        
        const user = req.user        
        const post = await Post.findOne({ _id: req.params.postId })
        if (!post) throw new Error(`Could not get post with the ID, ${req.params.postId}`)                
        if (user.likes.includes(post._id)) throw new Error('User cannot like the same post twice')                
        user.likes.push(post._id)        
        post.likesNum ++
        await user.save()
        await post.save()
        res.status(200).json( { message: 'User successfully liked post', post })
    } catch(err) {
        res.status(400).json({ message: 'Could not like post', details: err.message })
    }
}

// update post
exports.update = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const user = await User.findOne({ _id: req.params.id })
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ message: 'Could not update', details: err.message })
    }
}

// delete post
exports.destroy = async (req, res) => {
    try {
        const deleted = await Post.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ message: `The post with the id, ${deleted._id} was successfully deleted.` })
    } catch (err) {
        res.status(400).json({ message: 'Could not delete post', details: err.message })
    }
}

// show post
exports.show = async (req, res) => {
    try {
        const foundPost = await Post.findOne({ _id: req.params.id }).populate('replies author') // look into this
        res.status(200).json(foundPost)
    } catch (err) {
        res.status(400).json({ message: 'Could not find post', details: err.message })
    }
}

