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
            return res.status(200).json(user)
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

            return res.status(200).json(userAfterUpdate)

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async addFriend(req, res) {
        try {
            const myID = req.user.id
            const friend_name = req.body.username

            const friendID = await userModel.findOne({ username: friend_name }, '_id')
            console.log(friendID)
            if (!friendID) {
                return res.status(400).json({ message: 'Such user doesn\'t exists' })
            }

            const myFriends = await userModel.findOne({ _id: myID }, 'friends')
                .populate({
                    path: 'friends',
                    select: 'username'
                })

            const alreadyFriend = myFriends.friends.map((user) => user.username).includes(friend_name)

            if (alreadyFriend) {
                return res.status(400).json({ message: `Such user is in friends list already` })
            }

            const user = await userModel.findByIdAndUpdate({ _id: myID }, { $push: { friends: friendID } }, { new: true })
                .populate({
                    path: 'friends',
                    select: 'username'
                })
                .populate('posts')
                .exec()

            await userModel.findByIdAndUpdate({ _id: friendID._id }, { $push: { friends: myID } }, { new: true })

            return res.status(200).json(user)

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

            await userModel.findByIdAndUpdate({ _id: friendID._id }, { $pull: { friends: _id } }, { new: true })

            return res.status(200).json(user)

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
            
            return res.status(200).json(friends)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async getPotentialFriends(req, res) {
        try {
            const username = req.query.username

            const user = await userModel.findOne({ username }).populate('friends')
            const admin = await userModel.findOne({ username: 'admin' })
            const userFriendIds = user.friends.map(friend => friend._id)
            const potentialFriends = await userModel.find({ _id: { $nin: [...userFriendIds, user._id, admin._id] } })

            const potentialFriendsUsernames = potentialFriends.map(user => user.username)
            const shuffledPotentialFriendsUsernames = potentialFriendsUsernames.sort((a, b) => 0.5 - Math.random());
            const limitedPotentialFriends = shuffledPotentialFriendsUsernames.slice(0, 11)

            return res.status(200).json(limitedPotentialFriends)

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

}

module.exports = new userController()