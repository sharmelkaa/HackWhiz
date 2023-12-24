const userModel = require('../models/userModel')
const roleModel = require('../models/roleModel')
const tokenModel = require('../models/tokenModel')
const allUsersModel = require('../models/allUsersModel')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET)
}

const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
});

class authController {
    async login(req, res) {
        try {
            const { username, password } = req.body

            const errors = myValidationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() })
            }

            const user = await userModel.findOne({ username })
                .populate({
                    path: 'friends',
                    select: 'username'
                })
                .populate('posts')
                .exec()

            if (!user) {
                return res.status(400).json({ message: "User data is not correct" })
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: "User data is not correct" })
            }

            const accessToken = generateAccessToken(user._id, user.role, user.username)
            await tokenModel.create({ user: user._id, accessToken: accessToken })

            return res.status(200).json({ token: accessToken, user })

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    async logout(req, res) {
        try {
            const user = req.user.id

            const { deletedCount } = await tokenModel.deleteOne({ user })
            if (deletedCount === 0) {
                return res.status(400).json({ message: 'Token Error' })
            }

            return res.status(200).json({ USER_LOGGED_OUT: 'SUCCESSFULLY' })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
    async signup(req, res) {
        try {
            const { username, email, password } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() })
            }

            const userAlreadyExistsWithThisUsername = await userModel.findOne({ username })
            const userAlreadyExistsWithThisEmail = await userModel.findOne({ email })

            if (userAlreadyExistsWithThisUsername) {
                return res.status(400).json({ message: 'User with such username already exists'})
            }

            if (userAlreadyExistsWithThisEmail) {
                return res.status(400).json({ message: 'User with such email already exists'})
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await roleModel.findOne({ value: 'USER' })

            const newUser = await userModel.create({ username, email, password: hashPassword, role: userRole.value })
            await allUsersModel.findOneAndUpdate({}, { $push: { users: newUser._id } })

            return res.status(200).json({ USER_SIGNED_UP: 'SUCCESSFULLY'})

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}

module.exports = new authController()