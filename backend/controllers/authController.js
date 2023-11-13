const userModel = require('../models/userModel')
const roleModel = require('../models/roleModel')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, secret, { expiresIn: 24 })
}
class authController {
    async login(req, res) {
        try {
            const { username, password } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({ message: errors.array() })
                return
            }

            const user = await userModel.findOne({ username })
            if (!user) {
                res.status(400).json( {message: "User with such username doesn't exist"})
                return
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                res.status(400).json( {message: "Wrong password"})
                return
            }

            return res.status(200).json({ message: 'logged in' })

            // const token = generateAccessToken(user._id, user.role)
            // return res.json(token)

        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }

    async signup(req, res) {
        try {
            const { username, email, password } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({ message: errors.array() })
                return
            }

            const userAlreadyExistsWithThisUsername = await userModel.findOne({ username })
            const userAlreadyExistsWithThisEmail = await userModel.findOne({ email })

            if (userAlreadyExistsWithThisUsername) {
                res.status(400).json({ message: 'User with such username already exists'})
                return
            }

            if (userAlreadyExistsWithThisEmail) {
                res.status(400).json({ message: 'User with such email already exists'})
                return
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await roleModel.findOne({ value: 'USER' })
            const newUser = new userModel({ username, email, password: hashPassword, role: userRole.value })
            await newUser.save()

            res.status(200).json({ message: 'User successfully signed up'})

        } catch (e) {
            res.status(400).json({ message: 'Sign Up error' })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await userModel.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()