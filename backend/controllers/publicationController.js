const userModel = require("../models/userModel");
const postModel = require('../models/postModel')
class publicationController {
    async post(req, res) {
        try {
            const _id = req.user.id
            const { title, body, forAll } = req.body
            const newPublication = await postModel.create({ author: _id, title, body, forAll })
            const user = await userModel.findByIdAndUpdate({ _id }, { $push: { posts: newPublication._id } }, { new: true })
                .populate('friends')
                .populate('posts')
                .exec()
            return res.status(200).json({ user })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    async getPosts(req, res) {
        try {
            const username = req.query.username
            if (!username) {
                return res.status(400).json({ message: 'Username is required' })
            }
            const posts = await userModel.findOne({ username }, 'posts')
                .populate('posts')
                .exec()
            if (!posts) {
                return res.status(400).json({ message: 'Such user doesn\'t exists' })
            }
            return res.status(200).json({ posts })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}

module.exports = new publicationController()