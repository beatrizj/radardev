import React, { useState, useEffect } from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'

//obter localização do usuário (pede permissão para o usuário quando for executada)
//navigator.geolocation.getCurrentPosition()

//o useEffect executa uma função toda vez que uma informação é alterada ou uma vez durante a renderização do componente

function App() {
    const [devs, setDevs] = useState([])

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs')

            setDevs(response.data)
        }

        loadDevs()
    }, [])

    async function handleAddDev(data) {
        //e.preventDefault() evita o comportamento padrão do form de enviar os dados para outra tela

        const response = await api.post('/devs', data)

        setDevs([...devs, response.data])
    }

    return (
        <div id='app'>
            {/* a tag aside é usada para fazer uma sidebar e a main é onde fica o conteúdo principal*/}
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev} />
                    ))}
                </ul>
            </main>
        </div>
    )
}

export default App