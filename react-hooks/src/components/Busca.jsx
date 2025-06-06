import axios from 'axios'
import { Button } from 'primereact/button'
import striptags from 'striptags'
import { generate } from "random-words";
import React, { useEffect, useState } from 'react'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'

const Busca = () => {

    const [termoDeBusca, setTermoDeBusca] = useState(generate)
    const [resultados, setResultados] = useState([])

    // useEffect(() => {
    //     console.log("Executando todas as vezes...")
    // })

    // useEffect(() => {
    //     console.log("Executando somente uma vez...")
    // }, [])

    useEffect(() => {
        console.log("Executando da primeira vez e quanto o termo for atualizado...")
        const buscar = async () => {
            const { data } = await axios.get(
                'https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    format: 'json',
                    origin: '*',
                    srsearch: termoDeBusca
                }
            }
            )
            setResultados(data?.query?.search)
            console.log(data)
        }
        const timeoutID = setTimeout(() => {
            if(termoDeBusca)
                buscar()
        }, 500)
        return () => {
            clearTimeout(timeoutID)
        }
    }, [termoDeBusca])

    return (
        <div>
            <IconField iconPosition='left'>
                <InputIcon className='pi pi-search' />
                <InputText
                    placeholder='Buscar...'
                    onChange={(e) => setTermoDeBusca(e.target.value)}
                    value={termoDeBusca} />
            </IconField>
            {
                resultados.map((resultado) => {
                    return (
                        <div key={resultado.pageid} className='my-4 border border-1 border-400'>
                            {/* aqui vai ficar o título */}
                            <div className='border-bottom border border-1 border-400 p-3 text-center font-bold'>
                                {resultado.title}
                                <span>
                                    <Button
                                        icon="pi pi-send"
                                        className='ml-3 p-button-rounded p-button-secondary'
                                        onClick={() => {
                                            window.open(`https://en.wikipedia.org?curid=${resultado.pageid}`)
                                        }} />
                                </span>
                            </div>
                            {/* aqui vai ficar o conteúdo */}
                            <div className='p-4 text-center'>
                                <span dangerouslySetInnerHTML={{ __html: resultado.snippet }}>
                                </span>
                                {/* {striptags(resultado.snippet)} */}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Busca