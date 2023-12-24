const allUsersModel = require("../models/allUsersModel");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
class adminController {
    async getUsersList(req, res) {
        try {
            if (req.user.role !== 'ADMIN') {
                return res.status(400).json({ message: 'You don\'t have administrative rights' })
            }

            const usersList = await allUsersModel.findOne()
                .populate('users')
                .exec()
            const usernames = usersList.users.map((user) => user.username)

            return res.status(200).json(usernames)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async deletePost(req, res) {
        try {
            if (req.user.role !== 'ADMIN') {
                return res.status(400).json({ message: 'You don\'t have administrative rights' })
            }

            const postID = req.body.postID
            const deletedPost = await postModel.deleteOne({ _id: postID})
            if (deletedPost.deletedCount === 0) {
                return res.status(400).json({ message: 'Post was not found' })
            }

            const username = req.body.username
            await userModel.findOneAndUpdate({ username }, { $pull: { posts: postID } }, { new: true })

            return res.status(200).json({ POST_WAS_DELETED: 'SUCCESSFULLY' })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}

module.exports = new adminController()