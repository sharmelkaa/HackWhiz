const { Router } = require('express')
const adminController = require('../controllers/adminController')
const authMiddleware = require("../middlewares/authMiddleware");

const adminRouter = new Router()

adminRouter.get('/users_list', authMiddleware, adminController.getUsersList)

module.exports = adminRouter