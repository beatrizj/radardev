const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req, res) {
        //Buscar todos os devs num raio de 10km
        //Filtrar por tecnologia
        const { latitude, longitude, techs } = req.query
        const techsArray = parseStringAsArray(techs)
        
        const devs = await Dev.find({
            techs: {
                $in: techsArray, //encontrar devs com a mesma tecnologia que estão em techsArray
            },
            location: {
                $near: { //encontrar perto da localização
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000 //10km
                },
            }
        })

        return res.json({ devs })
    }
}