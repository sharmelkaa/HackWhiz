const { Router } = require('express')
const authController = require('../controllers/authController')
const { check } = require('express-validator')

const authRouter = new Router()

authRouter.post('/login', [
    check('username', "Username can't be empty").notEmpty(),
    check('password', "Password can't be empty").notEmpty(),
], authController.login)

authRouter.post('/signup',[
    check('username', "Username can't be empty").notEmpty(),
    check('email', "Email can't be empty").notEmpty(),
    check('password', "Password should be longer than 4 signs and less than 10").isLength({ min: 4, max: 10 }),
], authController.signup)

authRouter.get('/getusers', authController.getUsers)

module.exports = authRouter