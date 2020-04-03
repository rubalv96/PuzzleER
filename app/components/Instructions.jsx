import React from "react";
let GLOBAL_CONFIG = require('../config/config.js');
import './../assets/scss/main.scss';

export default function Instructions(){
  let initialImage;
  GLOBAL_CONFIG.initialImage === "" ? initialImage = "" : initialImage =
      (<img src={GLOBAL_CONFIG.initialImage} style={{width:300, height:200, display:"block", margin:"auto"}} alt={"Imagen de mensaje inicial."}/>
      );
  return (
    <React.Fragment>
      <div className="printInstructions" >
        <p className={"title"}>{GLOBAL_CONFIG.title}</p>
        <p><b>Instrucciones</b></p>
        <ul>
          <li>El objetivo del puzle es ordenar las piezas para completar una imagen.</li>
          <li>Se debe recortar por la línea de puntos cada pieza.</li>
          <li>En caso de que las piezas fuesen de doble cara se recomienda imprimir a doble cara las hojas 2 y 3 del recurso para que coincidan las piezas con su reverso</li>
        </ul>
        <p>{GLOBAL_CONFIG.initialMessagePrint}</p>
        {initialImage}
      </div>
      <div className="pagebreak" />
    </React.Fragment>
  );
}