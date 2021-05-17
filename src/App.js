import Formulario from './Components/Formulario';
import ListadoImagenes from './Components/ListadoImagenes';
import React, {useState, useEffect} from 'react';

function App() {
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() =>{
    
    const consultarApi = async () => {
      if (busqueda === '') return;
      const imagenesPorPagina = 30;
      const key = '21660774-2b9eff86c0faf58796236746a';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    };

    consultarApi();
    
  }, [busqueda, paginaActual])
  
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if(nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if(nuevaPaginaActual > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de imagenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className='row justify-content-center'>
        <ListadoImagenes
          imagenes={imagenes}        
        />  
        {(paginaActual === 1) ? null : (
          <button 
            type='button'
            className='bbtn btn-info mr-1'
            onClick={paginaAnterior}
          >Anterior &laquo; 
          </button>
        )}
        {(paginaActual === totalPaginas) ? null : (
          <button 
            type='button'
            className='bbtn btn-info'
            onClick={paginaSiguiente}
          >Siguiente &raquo; 
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
