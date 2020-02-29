//informar como o Dev vai ser dentro da base de dados
const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        createIndexes: '2dsphere'
    }
})

module.exports = mongoose.model('Dev', DevSchema) //exportar só o Schema
