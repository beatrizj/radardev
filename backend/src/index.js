const express = require('express')
const mongoose = require('mongoose') //conexão com o Mongo
const routes = require('./routes')

const app = express()

mongoose.connect('mongodb+srv://beatrizj:Amendoporco01@cluster0-5ltns.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('useFindAndModify', false)

app.use(express.json()) //para o express entender JSON
app.use(routes)

//Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros:
    //Query Params: utilizado no GET, req.query (filtros, ordenação, paginação...)
    //Route Params: utilizado no PUT e no DELETE, req.params (identificar um recurso na alteração ou remoção)
    //Body: utilizado no POST e no PUT, req.body (dados para criação ou alteração de um registro) 

app.listen(3333)