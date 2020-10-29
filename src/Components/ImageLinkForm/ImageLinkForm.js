import React from "react"; //importar la libería de react
import "./imageLink.css"; //importar los estilos css del componente

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  // Crear una función que recibe como parámetro un objeto con dos funciones definidas en el componente "App" y pasadas en sus correspontiendes elementos como atributos
  return (
    // un elemento "p" con un título, luego un div que contiene un input text para la url y un botón para mandar esa imagen a la Api y a el elemento de abajo que la muestra
    <div>
      <p className="f3">
        {"This magic brain will detect faces in your pictures"}
      </p>
      <div className="center-flex">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange} // función que detecta un cambio en el input
          />
          <button
            className="w-30 grow f4 link ph3 pv2 white bg-light-purple"
            onClick={onSubmit} //función que manda la imagen a distintos destinos
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
