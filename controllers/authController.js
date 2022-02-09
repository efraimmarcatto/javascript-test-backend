const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async login(req, res) {
        const data = req.body
        const user = await User.findOne({ where: { email: data.email } })
        if (!user || !(await bcrypt.compare(data.password, user.password)))
            return res.status(401).send({ error: { message: 'Login Error' } })
        const token = jwt.sign(
            user.dataValues,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '24h' }
        )

        return res.json({ user: user.name, token })
    },
}
