const { Router } = require('express')
const adminController = require('../controllers/adminController')
const authMiddleware = require("../middlewares/authMiddleware");

const adminRouter = new Router()

adminRouter.get('/users_list', authMiddleware, adminController.getUsersList)

adminRouter.delete('/admin_delete_post', authMiddleware, adminController.deletePost)

module.exports = adminRouter