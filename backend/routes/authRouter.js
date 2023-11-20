const { Router } = require('express')
const authController = require('../controllers/authController')
const { check } = require('express-validator')


const authRouter = new Router()

authRouter.post('/login', [
    check('username')
        .notEmpty().withMessage('Username can\'t be empty'),
    check('password')
        .notEmpty().withMessage('Password can\'t be empty')
], authController.login)

authRouter.post('/logout', authController.logout)

authRouter.post('/signup',[
    check('username')
        .notEmpty().withMessage('Username is required field')
        .isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),

    check('email')
        .notEmpty().withMessage('Email is required field')
        .isEmail().withMessage('Enter a valid email'),

    check('password')
        .notEmpty().withMessage('Password is required field')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).withMessage('Password must consist of 6-20 characters containing at least one digit, one upper and one lowercase letter')
], authController.signup)

authRouter.get('/getusers', authController.getUsers)

module.exports = authRouter