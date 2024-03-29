require('dotenv').config()
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    body: { type: String, required: true },
    isReply: { type: Boolean, default: false },
    likesNum: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parentPost: { type: String },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post