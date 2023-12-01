const userModel = require("../models/userModel");
const fs = require('fs')

class userController {
    async getUserData(req, res) {
        try {
            const username = req.query.username
            if (!username) {
                return res.status(400).json({ message: 'Username is required' })
            }

            const user = await userModel.findOne({ username }).select('-password -email -role -__v -_id -friends -posts')
            if (!user) {
                return res.status(400).json({ message: 'User is not found' })
            }

            // const authorizedUserID = req.user.id
            // const authorizedUser = await userModel.findOne({ _id: authorizedUserID }).select('-role -__v -_id -friends -posts')
            //
            // if (user._id.equals(authorizedUserID)) {
            //     return res.status(200).json(authorizedUser)
            // }

            return res.status(200).json(user)

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    
    async getPersonalData(req, res) {
        try {
            const _id = req.user.id
            const user = await userModel.findOne({ _id }).select('-role -__v -password -_id -friends -posts')

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
            const user = await userModel.findByIdAndUpdate(userID, { avatar })

            return res.status(200).json({ message: 'Avatar uploaded successfully' })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async deleteAvatar(req, res) {
        try {
            const user = await userModel.findById(req.user.id)

            fs.unlinkSync(`C:\\Users\\dudin\\WebstormProjects\\HackWhiz\\backend\\images\\${user.avatar}`)

            user.avatar = null
            await user.save()

            return res.status(200).json({ message: 'Avatar deleted successfully' })

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}

module.exports = new userController()