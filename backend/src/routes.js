const { Router } = require('express') //importar apenas o módulo de roteamento do express
const axios = require('axios') //faz chamadas para outras apis
const Dev = require('./models/Dev')

const routes = Router()

//async/await = vai aguardar terminar a chamada para devolver uma resposta

routes.post('/devs', async (req, res) => {
    const { github_username, techs } = req.body
    const apiRes = await axios.get(`https://api.github.com/users/${github_username}`)
    const { name = login, avatar_url, bio } = apiRes.data
    const techsArray = techs.split(',').map(tech => tech.trim())

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray
    })

    return res.json(dev)
})

module.exports = routes