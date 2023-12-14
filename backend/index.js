const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const publicationRouter = require('./routes/publicationRouter')
const commentRouter = require('./routes/commentRouter')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('images'));
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', adminRouter)
app.use('/api', publicationRouter)
app.use('/api', commentRouter)

const PORT = process.env.PORT || 3001

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        app.listen(PORT, () => console.log(`Server started on PORT - ${PORT}`))

    } catch (e) {
        console.log(e)
    }
}

start()