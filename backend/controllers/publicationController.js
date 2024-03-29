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
            return res.status(200).json(user)
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
            const populate = isFriend === 'true' ? 'posts' : { path: 'posts', match: { friendsOnly: false } }

            const posts = await userModel.findOne({ username }, 'posts')
                .populate(populate)
                .exec()
            console.log(posts)
            return res.status(200).json(posts)
        } catch (e) {
            res.status(400).json({ message: 'e.message' })
        }
    }

    async getRecentPost(req, res) {
        const username = req.query.username

        if (!username) {
            return res.status(400).json({ message: 'Username is required' })
        }

        const isFriend = req.query.isFriend
        const populate = isFriend === 'true' ? 'posts' : { path: 'posts', match: { friendsOnly: false } }

        const posts = await userModel.findOne({ username }, 'posts')
            .populate(populate)
            .exec()

        if (posts.posts.length === 0) {
            return res.status(200).json([])
        }
        const recentPost = posts.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
        return res.status(200).json(recentPost)
    }
    async deletePost(req, res) {
        try {
            const _id = req.user.id
            const postID = req.body.postID

            const deletedPost = await postModel.deleteOne({ _id: postID})
            if (deletedPost.deletedCount === 0) {
                return res.status(400).json({ message: 'Post was not found' })
            }

            const user = await userModel.findByIdAndUpdate({ _id }, { $pull: { posts: postID } }, { new: true })
                .populate('friends')
                .populate('posts')
                .exec()
            return res.status(200).json(user)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    async editPost(req, res) {
        try {
            const _id = req.user.id
            const postID = req.body.postID
            const changes = req.body.changes

            const editedPost = await postModel.findByIdAndUpdate({ _id: postID }, { ...changes })
            if (!editedPost) {
                return res.status(400).json({ message: 'Post was not found' })
            }

            const user = await userModel.findById({ _id })
                .populate('friends')
                .populate('posts')
                .exec()
            return res.status(200).json(user)

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}

module.exports = new publicationController()