const { Schema,  model} = require('mongoose')

const commentModel = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    post: {
        type: [Schema.Types.ObjectId],
        ref: 'Post'
    },
    timestamps: true
})

module.exports = model('Comment', commentModel);