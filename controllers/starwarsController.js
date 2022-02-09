const api = require('../api')

module.exports = {
    async read(req, res) {
        try {
            var { data } = await api.get(`/people/${req.params.id}`)

            var { data: planet } = await api.get(data.homeworld)

            data.homeworld = planet.name

            data.films = await Promise.all(
                data.films.map(async (film) => {
                    var { data: result } = await api.get(film)

                    return result.title
                })
            )

            data.vehicles = await Promise.all(
                data.vehicles.map(async (vehicle) => {
                    var { data: result } = await api.get(vehicle)

                    return result.name
                })
            )

            data.starships = await Promise.all(
                data.starships.map(async (starship) => {
                    var { data: result } = await api.get(starship)

                    return result.name
                })
            )
            data.id = parseInt(data.url.split('people')[1].split('/')[1])
            data.height = parseInt(data.height)
            data.mass = parseInt(data.mass)
            delete data.url
            delete data.created
            delete data.edited

            res.json(data)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to request Star Wars Info' })
        }
    },

    async readAll(req, res) {
        try {
            var url = '/people'
            if (req.params.page) url += `?page=${req.params.page}`
            var { data } = await api.get(url)

            await Promise.all(
                data.results.map(async (item) => {
                    var { data: planet } = await api.get(item.homeworld)
                    item.homeworld = planet.name
                    item.id = parseInt(
                        item.url.split('people')[1].split('/')[1]
                    )
                    item.height = parseInt(item.height)
                    item.mass = parseInt(item.mass)
                    delete item.films
                    delete item.species
                    delete item.vehicles
                    delete item.starships
                    delete item.created
                    delete item.edited
                    delete item.url
                })
            )
            delete data.next
            delete data.previous
            res.json(data)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to request Star Wars Info' })
        }
    },
}
