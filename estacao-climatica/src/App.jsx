//rafce
import React from 'react'
import Hippo from './Hippo'
import EstacaoClimatica from './EstacaoClimatica'

class App extends React.Component {

  state = {
    latitude: null,
    longitude: null,
    estacao: null,
    data: null,
    icone: null,
    mensagemDeErro: null
  }
  
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     latitude: null,
  //     longitude: null,
  //     estacao: null,
  //     data: null,
  //     icone: null,
  //     mensagemDeErro: null
  //   }
  // }

  componentDidMount() {
    console.log('componentDidMount')
    this.obterLocalizacao()
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
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
    console.log('render')
    return (
      <div className="container mt-2 text-center">
        <div className="row">
          <div className="col-12">
            <div className="justify-content-center d-flex">
              <Hippo />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-12 col-lg-6 col-xxl-4">
            <EstacaoClimatica
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            estacao={this.state.estacao}
            data={this.state.data}
            icone={this.state.icone}
            mensagemDeErro={this.state.mensagemDeErro}
            obterLocalizacao={this.obterLocalizacao}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App