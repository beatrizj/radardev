import React, { useState } from 'react';

import Header from './Header'

//Componente (um componente por arquivo) - Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação.
//            Função que retorna algum conteúdo. App() ex: timeline do facebook pq n afeta em nenhuma 
//            parte do site (cabeçalho, menu, etc). Cada post é um componente.
//Estado - informação que o componente vai manipular. O react não fica monitorando alterações nas variáveis
//Propriedade - mesma coisa que atributo
 
function App() {
  //imutabilidade: não se altera um dado. Cria-se um novo dado a partir do valor que tinha (não se usa counter++).
  //o setCounter vai criar um novo counter ao inves de alterá-lo
  const [counter, setCounter] = useState(0)

//toda função que é propria de um componente é criada dentro dele mesmo
  function incrementCounter() { 
    setCounter(counter + 1)
  }

  return (
//Não pode colocar três componentes sem um componente em volta deles.
//O <> é uma tag sem nomenclatura. Usando a <div> o código vai para o html, o que atrapalha a estilização.
    <>
      <Header title='Dashboard' />
      <Header title='Dashboard' />
      <Header title='Dashboard' />
      <h1>Contador: {counter}</h1>
      <button onCLick={incrementCounter}>Incrementar</button>
    </>  
  );
}

export default App;
