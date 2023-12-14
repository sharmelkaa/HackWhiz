const { Router } = require('express')
const commentsController = require('../controllers/commentsController')
const authMiddleware = require("../middlewares/authMiddleware");

const commentRouter = new Router()

commentRouter.post('/comment', authMiddleware, commentsController.comment)

commentRouter.get('/get_comments', authMiddleware, commentsController.getComments)

module.exports = commentRouter