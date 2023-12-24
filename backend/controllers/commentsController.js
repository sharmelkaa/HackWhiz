const userModel = require("../models/userModel");
const postModel = require('../models/postModel')
const commentModel = require('../models/commentModel')
class commentsController {
    async comment(req, res) {
        try {
            const { comment, author, post } = req.body
            const userID = await userModel.findOne({ username: author }, '_id')

            const newComment = await commentModel.create({ comment, author: userID._id, post })
            await postModel.findByIdAndUpdate({ _id: post }, { $push: { comments: newComment._id }}, { new: true })

            const updatedComments = await commentModel.find({ post })
                .populate('author')
                .exec()

            return res.status(200).json(updatedComments)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    async getComments(req, res) {
        try {
            const postID = req.query.postID
            if (!postID) {
                return res.status(400).json({ message: 'Post\'s ID is required' })
            }
            const comments = await commentModel.find({ post: postID })
                .populate('author')
                .exec()

            return res.status(200).json(comments)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    async deleteComment(req, res) {
        try {
            const { commentID, postID } = req.body
            const deletedComment = await commentModel.deleteOne({ _id: commentID})
            if (deletedComment.deletedCount === 0) {
                return res.status(400).json({ message: 'Comment was not found' })
            }

            await postModel.findByIdAndUpdate({ _id: postID }, { $pull: { comments: commentID } }, { new: true })

            const updatedComments = await commentModel.find({ post: postID })
                .populate('author')
                .exec()

            return res.status(200).json(updatedComments)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async editComment(req, res) {
        try {
            const { commentID, postID, changes } = req.body

            const editedComment = await commentModel.findByIdAndUpdate({ _id: commentID }, { ...changes })
            if (!editedComment) {
                return res.status(400).json({ message: 'Comment was not found' })
            }

            const updatedComments = await commentModel.find({ post: postID })
                .populate('author')
                .exec()

            return res.status(200).json(updatedComments)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}

module.exports = new commentsController()