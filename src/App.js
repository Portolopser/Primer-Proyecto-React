import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino : '',
    imagenes : [],
    pagina : ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
    //Leer el state de la pagina actual
    let pagina = this.state.pagina;

    //Si la pagina tiene el numero 1, no ir hacia atrás
      if(pagina === 1){
      return null;
    }

    //Restar uno a la pagina actual
    pagina--;

    //Agregare el cambio al state para que reste una página de continuo
    this.setState({
      pagina
    }, () => {
    this.consultarApi();
    this.scroll();
    });

    //console.log(pagina);
  }

  paginaSiguiente = () => {
    //Leer el state de la pagina actual
    let pagina = this.state.pagina;

    //Sumar uno a la pagina actual
    pagina++;

    //Agregar el cambio al state para que sume una página de continuo
    this.setState({
      pagina
    }, () => {
    this.consultarApi();
    this.scroll();
    });

    //console.log(pagina);
  }

  consultarApi = () => {
    //Esto es una variable que le pasamos a la variable con nombre "url" que contiene el valor del
    //texto que introducimos en el input del Buscador
    const termino = this.state.termino;
    //Variable que nos permite saber en que pagina nos encontramos
    const pagina = this.state.pagina;
    //Esta variable contiene la API key de Pixabay que utilizaremos para sacar las fotos
    //Al final de esta API key le pasamos la variable "termino" declarada arriba para
    //que nos busque lo que le hemos introducido en el input del Buscador
    const url = `https://pixabay.com/api/?key=17794418-a74993cf4bc9a076c6c4941cb&q=${termino}&per_page=30&page=${pagina}`;
    
    console.log(url);

    fetch(url)
    .then(respuesta => respuesta.json() )
    .then(resultado => this.setState({ imagenes : resultado.hits }) )
  }

  //Con esto hacemos que muestre en la consola del developer tools el 
  //valor que hemos introducido en el input del buscador
  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }

  render() {
    return (
      <div className="app container">
          <div className="jumbotron">
            <p className="lead text-center">Buscador de imágenes</p>
            <Buscador
              datosBusqueda={this.datosBusqueda}
            />
          </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes = {this.state.imagenes}
            paginaAnterior = {this.paginaAnterior}
            paginaSiguiente = {this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
