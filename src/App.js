import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino : '',
    imagenes : []
  }

  consultarApi = () => {
    //Esto es una variable que le pasamos a la variable con nombre "url" que contiene el valor del
    //texto que introducimos en el input del Buscador
    const termino = this.state.termino;

    //Esta variable contiene la API key de Pixabay que utilizaremos para sacar las fotos
    //Al final de esta API key le pasamos la variable "termino" declarada arriba para
    //que nos busque lo que le hemos introducido en el input del Buscador
    const url = `https://pixabay.com/api/?key=17794418-a74993cf4bc9a076c6c4941cb&q=${termino}&per_page=30`;
    
    //console.log(url);
    fetch(url)
    //Esto nos genera una respuesta, que vamos a pasarla a formato JSON
    .then(respuesta => respuesta.json() )
    .then(resultado => this.setState({ imagenes : resultado.hits }) )

  }

  //Con esto hacemos que muestre en la consola del developer tools el 
  //valor que hemos introducido en el input del buscador
  datosBusqueda = (termino) => {
    this.setState({
      termino
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
          <Resultado
            imagenes = {this.state.imagenes}
          />
      </div>
    );
  }
}

export default App;
