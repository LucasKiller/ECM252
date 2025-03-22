//rafce
import React from 'react'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      estacao: null,
      data: null,
      icone: null,
      mensagemDeErro: null
    }
  }

  estacoes = {

    VERAO: {
      icone: "sun",
      nome: "Verão"
    },

    INVERNO: {
      icone: "snowflake",
      nome: "Inverno"
    },

    OUTONO: {
      icone: "leaf",
      nome: "Outono"
    },

    PRIMAVERA: {
      icone: "seedling",
      nome: "Primavera"
    }

  }

  obterEstacao = (data, latitude) => {
    const anoAtual = data.getFullYear()
    const d1 = new Date(anoAtual, 5, 21)
    const d2 = new Date(anoAtual, 8, 24)
    const d3 = new Date(anoAtual, 11, 22)
    const d4 = new Date(anoAtual, 2, 21)
    const estouNoSul = latitude < 0

    if (data >= d1 && data < d2)
      return estouNoSul ? this.estacoes.INVERNO : this.estacoes.VERAO
    if (data >= d2 && data < d3)
      return estouNoSul ? this.estacoes.PRIMAVERA : this.estacoes.OUTONO
    if (data >= d3 || data < d4)
      return estouNoSul ? this.estacoes.VERAO : this.estacoes.INVERNO
    return estouNoSul ? this.estacoes.OUTONO : this.estacoes.PRIMAVERA
  }

  obterLocalizacao = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const dataAtual = new Date()

        const estacao = this.obterEstacao(dataAtual, position.coords.latitude)

        const icone = estacao.icone

        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          estacao: estacao.nome,
          data: dataAtual.toLocaleTimeString(),
          icone: icone
        })

      },
      (err) => {
        // Não faça isso
        // this.state.mensagemDeErro = 'Erro'

        //Faça isso
        this.setState({
          mensagemDeErro: 'Não foi possível carregar, tente novamente mais tarde!'
        })
      }
    )
  }

  render() {
    return (
      <div className="container mt-2 text-center">
        <div className="row">
          <div className="col-12">
            <div className="justify-content-center d-flex">
              <i className="fa-hippo fas fa-3x"></i>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-6 col-xxl-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center border rounded mb-2" style={{ height: '6rem' }}>
                  <i className={`fas fa-5x fa-${this.state.icone}`}></i>
                  <p className="w-75 ms-3 text-center fs-1">
                    {this.state.estacao}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-center">
                  {
                    this.state.latitude ?
                      `Coordenadas: ${this.state.latitude}, ${this.state.longitude}. Data: ${this.state.data}`
                      :
                      this.state.mensagemDeErro ?
                        `${this.state.mensagemDeErro}`
                        :
                        'Clique no botão para saber a sua estação'
                  }
                </p>
              </div>
              <button type="button" className='btn btn-primary w-100 mt-3' onClick={() => this.obterLocalizacao()}>
                Qual é a minha estação?
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App