const { Router } = require('express')
const publicationController = require('../controllers/publicationController')
const authMiddleware = require("../middlewares/authMiddleware");


const publicationRouter = new Router()

publicationRouter.post('/post', authMiddleware, publicationController.post)

publicationRouter.get('/get_posts', authMiddleware, publicationController.getPosts)

module.exports = publicationRouter