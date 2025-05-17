import React from 'react'
import Accordion from './components/Accordion'

const itens = [
  {
    titulo: 'Java',
    conteudo: 'Linguagem compilada e interpretada.'
  },
  {
    titulo: 'Python',
    conteudo: 'Linguagem interpretada e dinamicamente tipada.'
  },
  {
    titulo: 'JavaScript',
    conteudo: 'Linguagem interpretada e executa do lado do cliente e do lado do servidor também.'
  }
]

const App = () => {

  return (
    <div>
      <Accordion itens={itens} />
    </div>
  )
}

export default App
