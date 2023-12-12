const allUsersModel = require("../models/allUsersModel");

const ALL_USERS_ID = '657045f873b78fc8371a217e'
class adminController {
    async getUsersList(req, res) {
        try {
            if (req.user.role !== 'ADMIN') {
                return res.status(400).json({ message: 'You don\'t have administrative rights' })
            }

            const users_list = await allUsersModel.findById({ _id: ALL_USERS_ID})
                .populate('users')
                .exec()
            return res.status(200).json(users_list.users)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}

module.exports = new adminController()