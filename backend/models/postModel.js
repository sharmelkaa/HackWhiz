const { Schema,  model } = require('mongoose')

const postModel = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    friendsOnly: {
        type: Boolean
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    },
}, { timestamps: true })

module.exports = model('Post', postModel);