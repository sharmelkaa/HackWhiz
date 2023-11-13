const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

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