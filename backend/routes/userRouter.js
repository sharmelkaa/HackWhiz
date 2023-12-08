const { Router } = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require("../middlewares/authMiddleware");
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        const newFilename = `${uniqueSuffix}.${fileExtension}`;

        cb(null, newFilename)
    }
})
const upload = multer({ storage: storage })

const userRouter = new Router()

userRouter.get('/personal_data', authMiddleware, userController.getPersonalData)

userRouter.get('/user', authMiddleware, userController.getUserData)

userRouter.post('/upload_avatar', [
    authMiddleware,
    upload.single('avatar')
], userController.uploadAvatar)

userRouter.delete('/delete_avatar', authMiddleware, userController.deleteAvatar)

userRouter.post('/add_friend', authMiddleware, userController.addFriend)

userRouter.delete('/delete_friend', authMiddleware, userController.deleteFriend)

userRouter.get('/friends', authMiddleware, userController.getFriends)

module.exports = userRouter