import React, {useState} from "react";
import {GLOBAL_CONFIG} from "../config/config";
import {Modal, Button} from 'react-bootstrap';

export default function InitialMessage(props){
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  let initialImage;
  GLOBAL_CONFIG.initialImage === "" ? initialImage = "./assets/images/egipto.jpg" : initialImage = GLOBAL_CONFIG.initialImage;
  return (
    <>

      <Modal backdrop="static" keyboard={false} show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header>
          <Modal.Title>Resuelve el puzzle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={()=>{handleClose(); props.ocultarInstrucciones(); props.onStartTime()}}>
                        ¡Jugar!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}