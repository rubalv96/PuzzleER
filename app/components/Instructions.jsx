import React from "react";
import {GLOBAL_CONFIG} from "../config/config";

export default function Instructions(){

  let initialImage;
  GLOBAL_CONFIG.initialImage === "" ? initialImage = "./assets/images/egipto.jpg" : initialImage = GLOBAL_CONFIG.initialImage;
  return (
    <>
        <div className="printInstructions" >
      <p><b>Instrucciones</b></p>
      <ul>
        <li>El objetivo del recurso es ordenar las piezas para completar una imagen.</li>
        <li>Para intercambiar las piezas se deberá hacer click sobre una de ellas y volver a hacer click sobre la nueva posición.</li>
        <li>Hay más piezas que las correspondientes a la solución del puzzle.</li>
        <li>Aquellas piezas que no correspondan a la solución se deberán colocar en el espacio reservado para ello situado en la parte inferior del área de puzzle.</li>
        <li>Las piezas contienen doble cara. Para dar la vuelta a la pieza se debe hacer doble click sobre la misma.</li>
        <li>Además, se puede hacer uso del botón de toggle en la parte inferior del puzzle para darle la vuelta a todas las piezas simultáneamente.</li>
        <li>Cuando se haya completado el puzzle se deberá comprobar que la solución es correcta haciendo click en el botón <i>Comprobar</i>.</li>
      </ul>
      <p>{GLOBAL_CONFIG.initialMessage}</p>

      <img src={initialImage} style={{width:300, height:200, display:"block", margin:"auto"}} alt={"Imagen de mensaje inicial."}/>


        </div>
        <div className="pagebreak" />
    </>
  );
}