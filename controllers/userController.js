const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async create(req, res) {
        var data = req.body

        // Validations
        const emailExist = await User.findOne({ where: { email: data.email } })

        if (emailExist)
            return res.status(400).json({ error: 'E-mail already in use' })

        const salt = await bcrypt.genSalt()
        data.password = await bcrypt.hash(data.password, salt)

        const newUser = await User.create(data)
        const { email, name, phone, id } = newUser.dataValues

        return res.json({ id, name, phone, email })
    },

    async read(req, res) {
        res.send(req.user)
    },

    async readAll(req, res) {
        res.send(await User.findAll())
    },

    async update(req, res) {
        var data = req.body

        try {
            const user = await User.findOne({ where: { id: req.user.id } })
            if ('password' in data)
                data.password = await bcrypt.hash(
                    data.password,
                    await bcrypt.genSalt()
                )

            const updatedUser = await user.update(data)

            res.json(updatedUser)
        } catch (error) {
            res.status(500).json({ error: 'Unable to update data.' })
        }
    },

    async delete(req, res) {
        const user = await User.findOne({ where: { id: req.user.id } })
        try {
            await user.destroy()
            res.json({ message: 'Deleted' })
        } catch (error) {
            res.status().json({ error: 'Unable to delete data.' })
        }
    },
}
