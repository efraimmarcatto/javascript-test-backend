const axios = require('axios')
const axiosCache = require('axios-cache-adapter')
const api = axiosCache.setup({
    baseURL: process.env.STARWARS_API,
    cache: { maxAge: 24 * 60 * 60 * 1000  },
})
module.exports = api
