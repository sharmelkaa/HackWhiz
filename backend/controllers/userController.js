const userModel = require("../models/userModel");
const fs = require('fs')
const path = require('path')
const MAIN_PATH = require('../main_path')
class userController {
    async getUserData(req, res) {
        try {
            const username = req.query.username
            if (!username) {
                return res.status(400).json({ message: 'Username is required' })
            }

            const user = await userModel.findOne({ username }).select('-friends -posts')
            if (!user) {
                return res.status(400).json({ message: 'User is not found' })
            }

            return res.status(200).json(user)

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    
    async getPersonalData(req, res) {
        try {
            const _id = req.user.id
            const user = await userModel.findOne({ _id })
                .populate({
                    path: 'friends',
                    select: 'username'
                })
                .populate('posts')
                .exec()
            return res.status(200).json(user)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async uploadAvatar(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'File error'})
            }
            const avatar = req.file.filename
            const userID = req.user.id
            const user = await userModel.findByIdAndUpdate(userID, { avatar }, { new: true })
                .populate({
                    path: 'friends',
                    select: 'username'
                })
                .populate('posts')
                .exec()
            return res.status(200).json({ user })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async deleteAvatar(req, res) {
        try {
            const userID = req.user.id
            const userBeforeUpdate = await userModel.findById(userID)

            const avatar_path = path.join(MAIN_PATH, 'images', userBeforeUpdate.avatar)
            fs.unlinkSync(avatar_path)

            const avatar = null
            const userAfterUpdate = await userModel.findByIdAndUpdate(userID, { avatar }, { new: true })
                .populate({
                    path: 'friends',
                    select: 'username'
                })
                .populate('posts')
                .exec()

            return res.status(200).json({ userAfterUpdate })

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async addFriend(req, res) {
        try {
            const _id = req.user.id
            const friend_name = req.body.username

            const friendID = await userModel.findOne({ username: friend_name }, _id)
            if (!friendID) {
                return res.status(400).json({ message: 'Such user doesn\'t exists' })
            }

            const user = await userModel.findByIdAndUpdate({ _id }, { $push: { friends: friendID } }, { new: true })
                .populate({
                    path: 'friends',
                    select: 'username'
                })
                .populate('posts')
                .exec()
            return res.status(200).json({ user })

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async deleteFriend(req, res) {
        try {
            const _id = req.user.id
            const friend_name = req.body.username

            const friendID = await userModel.findOne({ username: friend_name }, _id)
            if (!friendID) {
                return res.status(400).json({ message: 'Such user doesn\'t exists' })
            }
            const user = await userModel.findByIdAndUpdate({ _id }, { $pull: { friends: friendID._id } }, { new: true })
                .populate({
                    path: 'friends',
                    select: 'username'
                })
                .populate('posts')
                .exec()
            return res.status(200).json({ user })

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async getFriends(req, res) {
        try {
            const username = req.query.username
            if (!username) {
                return res.status(400).json({ message: 'Username is required' })
            }
            const friends = await userModel.findOne({ username }, 'friends')
                .populate({
                    path: 'friends',
                    select: 'username'
                })
                .exec()
            if (!friends) {
                return res.status(400).json({ message: 'Such user doesn\'t exists' })
            }
            
            return res.status(200).json({ friends })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

}

module.exports = new userController()