const { Schema,  model} = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        ref: 'Role'
    },
    avatar: {
        type: String
    },
    age: {
        type: Number
    },
    country: {
        type: String
    },
    online: {
        type: Boolean
    }
})

module.exports = model('User', userSchema)