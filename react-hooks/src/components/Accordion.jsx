import './Accordion.css'
import React, { useState } from 'react'
import { Card } from 'primereact/card'

const Accordion = ({ itens }) => {

    const [indiceAtivo, setIndiceAtivo] = useState(null)

    const itemClicado = (indice) => {
        setIndiceAtivo(indice)
    }

    const expressaoJSX = itens.map((item, indice) => {

        const classExibirIcone = indice === indiceAtivo ? 'down' : 'right'

        const classExibirConteudo = indice === indiceAtivo ? '' : 'hidden'

        return (
            <Card id='accordion' key={indice} className='border-1 border-400'>
                <div onClick={() => itemClicado(indice)}>
                    <i className={`pi pi-angle-${classExibirIcone}`}></i>
                    <h5 className='ml-3 inline'>{item.titulo}</h5>
                </div>
                <p className={classExibirConteudo}>
                    {item.conteudo}
                </p>
            </Card>
        )
    })

    return (
        <div>
            <p>{indiceAtivo}</p>
            {
                expressaoJSX
            }
        </div>
    )
}

export default Accordion