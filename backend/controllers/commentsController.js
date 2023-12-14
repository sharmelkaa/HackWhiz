const userModel = require("../models/userModel");
const postModel = require('../models/postModel')
const commentModel = require('../models/commentModel')
class commentsController {
    async comment(req, res) {
        try {
            const { comment, author, post } = req.body
            const userID = await userModel.findOne({ username: author }, '_id')
            const newComment = await commentModel.create({ comment, author: userID._id, post })
            const updatedPost = await postModel.findByIdAndUpdate({ _id: post }, { $push: { comments: newComment._id }}, { new: true })

            return res.status(200).json({ newComment })
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

            return res.status(200).json({ comments })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    async deleteComment(req, res) {
        try {

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    async editComment(req, res) {
        try {

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}

module.exports = new commentsController()