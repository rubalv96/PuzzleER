import React, {useState} from "react";
import {GLOBAL_CONFIG} from "../config/config";
import {Modal, Button} from 'react-bootstrap';
import Timer from "./Timer";
import './../assets/scss/main.scss';


export default function InitialMessage(props){
  const [show, setShow] = useState(true);
  const [enable, setEnable] = useState(false);
  const handleClose = () => setShow(false);
  // let timePiece = 0.5;
  // let time = Math.floor((GLOBAL_CONFIG.M * GLOBAL_CONFIG.N + GLOBAL_CONFIG.Mextra * GLOBAL_CONFIG.Nextra) * timePiece);
  let timer;
  props.temporizador ? timer = (
    <div style={{display:!enable ? 'block' : 'none'}}>
      <Timer time={5} showMinutes={false} onStartTime onFinishTime={()=>{setEnable(true);}} />
    </div>
  ) : timer = "";

  let initialImage;
  GLOBAL_CONFIG.initialImage === "" ? initialImage = "" : initialImage =
      (
          <img src={GLOBAL_CONFIG.initialImage} style={{width:300, height:200, display:"block", margin:"auto", borderRadius:"10px"}} alt={"Imagen de mensaje inicial."}/>

      );

  let piezasExtra = GLOBAL_CONFIG.Nextra !== 0 && GLOBAL_CONFIG.Mextra !== 0;
  let textoExtra;
  piezasExtra ? textoExtra = (
      <li>Hay más piezas que las correspondientes a la solución del puzzle, las piezas sobrantes se deberán colocar en el espacio reservado para ello situado en la parte derecha del área de puzzle.</li>
  ) : textoExtra ="";

  let textoVuelta;
  let piezasVuelta;
  piezasVuelta = (GLOBAL_CONFIG.image2 !== "");
  piezasVuelta ? textoVuelta = (
      <>
      <li>Las piezas contienen doble cara y se puede ver el reverso haciendo doble click sobre ella.</li>
      <li>Se puede dar la vuelta a todas las piezas simultáneamente pulsando en la opción <i>Girar todas las piezas</i>.</li>
        </>
  ) : textoVuelta="";

  return (
    <>

      <Modal backdrop="static" keyboard={false} show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header>
          <Modal.Title style={{fontSize:"45px", fontFamily:"'Megrim', cursive"}}>{GLOBAL_CONFIG.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{fontSize:"25px", fontFamily:"'Megrim', cursive"}}><b>Instrucciones</b></p>
          <ul style={{fontSize:"15px", fontFamily:"'Megrim', cursive"}}><b>
            <li>El objetivo del puzzle es ordenar las piezas hasta conseguir ver la imagen correcta.</li>
            <li>Para intercambiar las piezas se deberá hacer click sobre una de ellas y volver a hacer click sobre la nueva posición.</li>
            {textoExtra}
            {textoVuelta}
            <li>Cuando se haya completado el puzzle se deberá comprobar que la solución es correcta haciendo click en el botón <i>Comprobar solución</i>.</li>
          </b></ul>
          <p style={{fontSize:"20px", fontFamily:"'Megrim', cursive"}}><b>{GLOBAL_CONFIG.initialMessage}</b></p>

          {initialImage}
        </Modal.Body>
        <Modal.Footer>

          <Button className={"btn btn-dark"}style={{width:"50%", margin:"auto"}} variant="primary" disabled={!enable && props.temporizador} onClick={()=>{handleClose(); props.ocultarInstrucciones(); props.onStartTime();}}>
            <p style={{fontSize:"20px", fontFamily:"'Megrim', cursive"}}><b>¡Jugar!</b></p>
            {timer}

          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}