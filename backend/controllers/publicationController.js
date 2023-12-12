const userModel = require("../models/userModel");
const postModel = require('../models/postModel')
class publicationController {
    async post(req, res) {
        try {
            const _id = req.user.id
            const { title, body, friendsOnly } = req.body
            const newPublication = await postModel.create({ author: _id, title, body, friendsOnly })
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

            const isFriend = req.query.isFriend
            if (isFriend === 'true') {
                const posts = await postModel.find({})
                    .populate({
                        path: 'author',
                        match: { username },
                        select: 'username'
                    })
                    .exec()
                return res.status(200).json({ posts })
            }

            const posts = await postModel.find({ friendsOnly: false })
                .populate({
                    path: 'author',
                    match: { username },
                    select: 'username'
                })
                .exec()
            return res.status(200).json({ posts })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}

module.exports = new publicationController()