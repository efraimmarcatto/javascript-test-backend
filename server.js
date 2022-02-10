const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const app = express()

const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const starwarsRoute = require('./routes/starwars')

const db = require('./db')

//Initializing Database
db.sync()

//Middlewares
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/api/', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api', starwarsRoute)
app.get('/', (req, res) => {
    res.json({ message: 'API ONLINE' })
})

app.listen(process.env.PORT || 5000, () => console.log('Server online'))
