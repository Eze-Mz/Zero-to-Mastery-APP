import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imgUrl, box }) => {
  return (
    <div className="center-flex ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt="face"
          src={imgUrl} //muestra la imagen recibiendola del input del ussuario
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            // un div con la sobra formando un cuadrado y abajo las direcciones que son variables del objeto "box"
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
