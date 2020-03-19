import React, {useState} from "react";
import {GLOBAL_CONFIG} from "../config/config";
import {Modal, Button} from 'react-bootstrap';
import Clue from "./Clue";

export default function CluesMenu(props){
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <>

      <Modal backdrop="static" keyboard="false" show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header>
          <Modal.Title>¿Necesitas una mano? <img src="../assets/images/cactus.jpg" style={{width:"10%", height:"auto"}} alt={"Foto de ayuda"}/> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><b>Puedes elegir alguna de estas ayudas</b></p>
          <Clue nombreTitulo="Número de piezas correctas en el tablero"
            coste = "3"
            respuesta = {numPiezasCorrectas(props)}
            tiempoVisible = {GLOBAL_CONFIG.cluesTime.toString()}
            consumirPista = {props.consumirPista}
            numIntentosPistas={props.numIntentosPistas}

          />

          <Clue nombreTitulo="Ver solución del puzzle"
            coste = "15"
            respuesta = {verSolucion()}
            tiempoVisible = {GLOBAL_CONFIG.cluesTime.toString()}
            consumirPista = {props.consumirPista}
            numIntentosPistas={props.numIntentosPistas}
          />

        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={()=>{handleClose(); props.ocultarPistas();}}>
                        ¡Volver al juego!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function numPiezasCorrectas(props){
  // eslint-disable-next-line no-shadow
  let numPiezasCorrectas = 0;
  let piezas = props.piezas;
  for(let i = 0; i < piezas.length; i ++){
    if(piezas[i].row === piezas[i].posRow && piezas[i].column === piezas[i].posCol && !piezas[i].piezaExtra){
      numPiezasCorrectas ++;
    }
  }
  return (<p>Hay <strong>{numPiezasCorrectas} piezas correctas </strong> sobre el tablero.</p>);

}

function verSolucion(){
  return (
    <>
      <img
        style={{width:"50%", height:"auto", margin:"5%"}}
        src={GLOBAL_CONFIG.image1}
        alt={"Solución 1 del puzzle en imagen"}/>
      <img
        style={{width:"50%", height:"auto", margin:"5%"}}
        src = {GLOBAL_CONFIG.image2}
        alt = "Solución 2 del puzzle en imagen" />
    </>
  );
}