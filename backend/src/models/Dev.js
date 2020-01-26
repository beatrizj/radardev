//informar como o Dev vai ser dentro da base de dados
const mongoose = require('mongoose')

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String]
})

module.exports = mongoose.model('Dev', DevSchema) //exportar só o Schema
