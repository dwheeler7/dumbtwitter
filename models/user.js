const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jwt')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    gitUrl: { type: String, required: false },
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
}, { timestamps: true })

// hash password
userSchema.pre('save', async function(next) { 
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

// generate auth token method
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, 'secret')
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User