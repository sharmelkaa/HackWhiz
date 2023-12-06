const { Schema,  model} = require('mongoose')

const allUsersSchema = new Schema({
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    }
})

module.exports = model('AllUsers', allUsersSchema)