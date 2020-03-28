import React, {useState} from "react";
let GLOBAL_CONFIG = require('../config/config.js');
import {Modal, Button} from 'react-bootstrap';
import Timer from "./Timer";
import './../assets/scss/main.scss';

export default function ZoomPiece(props){

  const [show, setShow] = useState(true);
  let zoomWidth, zoomHeight, zoomFactor;
  zoomFactor = GLOBAL_CONFIG.zoomFactor;
  zoomWidth = Math.min(props.widthPiece * zoomFactor, window.innerWidth * 0.8);
  zoomHeight = Math.min(props.heightPiece * zoomFactor, window.innerHeight * 0.6);

  return (
    <>
      <Modal backdrop="static" keyboard={false} show={props.show} animation={false} size="xl" >
        <Modal.Header>
          <Modal.Title style={{fontSize:"25px", fontFamily:"'Megrim', cursive"}}>{GLOBAL_CONFIG.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign:"center"}}>
            <img src={props.srcImg} alt={"Imagen de la pieza"} style={{width:zoomWidth, height:zoomHeight}} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className={"btn btn-dark"}style={{width:"50%", margin:"auto"}} variant="primary" onClick={()=>{props.zoomOff();}}>
            <p style={{fontSize:"20px", fontFamily:"'Megrim', cursive"}}><b>¡Seguir jugando!</b></p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}