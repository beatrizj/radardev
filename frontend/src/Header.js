import React from 'react'

function Header(props) {
//o props é todas as propriedas que foram passadas para o header
//para usar a propriedade é só colocar {props.propriedade}
    return <h1>{props.title}</h1>
}

export default Header