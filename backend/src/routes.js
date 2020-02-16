const { Router } = require('express') //importar apenas o módulo de roteamento do express
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router()

//async/await = vai aguardar terminar a chamada para devolver uma resposta

routes.get('/devs', DevController.index)
routes.get('/devs/:id', DevController.show)
routes.post('/devs', DevController.store)
routes.delete('/devs/delete/:id', DevController.destroy)
routes.get('/search', SearchController.index)

module.exports = routes