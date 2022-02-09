const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token)
        return res.status(401).send({ error: { message: 'Access Denied' } })
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send({ error: { message: 'Invalid Token' } })
    }
}
