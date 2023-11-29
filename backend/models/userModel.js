const { Schema,  model} = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        private: false
    },
    email: {
        type: String,
        unique: true,
        required: true,
        private: true
    },
    password: {
        type: String,
        required: true,
        private: true
    },
    role: {
        type: String,
        ref: 'Role',
        private: true
    },
    avatar: {
        type: String,
        private: false
    },
    age: {
        type: Number,
        private: false
    },
    country: {
        type: String,
        private: false
    },
    online: {
        type: Boolean,
        private: false
    },
    posts: {
        type: [Schema.Types.ObjectId],
        ref: 'Post',
        private: false
    },
    friends: {
        type: [String],
        private: false
    }
})

module.exports = model('User', userSchema)