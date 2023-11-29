const jwt = require('jsonwebtoken')
require('dotenv').config()

function authMiddleware(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const accessToken = req.headers.authorization?.split(' ')[1]
        if (!accessToken) {
            return res.status(403).json({ message: "User is not authorized" })
        }
        req.user = jwt.verify(accessToken, process.env.TOKEN_SECRET)
        next()
    } catch (e) {
        res.status(403).json({ message: e.message })
    }
}

module.exports = authMiddleware