//o controller recebe a requisição, ativa o que ele precisa fazer e devolve uma resposta
const axios = require('axios') //faz chamadas para outras apis
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

//index (listar todos), show (listar um), store, update, destroy - funções controller

module.exports = {
    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async show(req, res) {
        const { id } = req.params
        const dev = await Dev.findById(id)

        return res.json(dev)
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })//encontrar no banco um usuário baseado no nome de usuário que está sendo passado na requisição

        if (!dev) { //se o usuário não existir é feito o cadastro
            const apiRes = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = apiRes.data
            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude] 
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }

        return res.json(dev)
    },

    async update(req, res) {
        const { id } = req.params
        const { github_username, name, techs, bio } = req.body
        const techsArray = parseStringAsArray(techs)
        
        await Dev.findByIdAndUpdate(id, { name, bio, techsArray }, {new: true})

        return res.json({ github_username, name, bio, techsArray })
    },

    async destroy(req, res) {
       const { id } = req.params
       await Dev.findByIdAndDelete(id)

       return res.send('Usuário excluído com sucesso')
        
    }
}