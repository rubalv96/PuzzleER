import React, {useState} from "react";
let GLOBAL_CONFIG = require('../config/config.js');
import {Modal, Button} from 'react-bootstrap';
import Timer from "./Timer";
import './../assets/scss/main.scss';

export default function ZoomPiece(props){

  const [show, setShow] = useState(true);
  let zoomWidthStandard, zoomWidth, zoomHeight, zoomFactor;
  GLOBAL_CONFIG.zoomFactor < 1 ? zoomFactor = 1 : zoomFactor = GLOBAL_CONFIG.zoomFactor;
  zoomWidthStandard = Math.min(props.widthPiece * zoomFactor, window.innerWidth * 0.8);
  props.isExtraPiece ? zoomWidth = zoomWidthStandard * 1.65 : zoomWidth = zoomWidthStandard;
  zoomHeight = Math.min(props.heightPiece * zoomFactor * 1.65, window.innerHeight * 0.6);

  return (
    <>
      <Modal backdrop="static" keyboard={false} show={props.show} animation={false} size="xl" >
        <Modal.Header>
          <Modal.Title style={{fontSize:"25px", fontFamily:"'Megrim', cursive"}}>{GLOBAL_CONFIG.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign:"center"}}>
            <img src={props.srcImg} alt={"Imagen de la pieza"} style={{width:zoomWidth, height:zoomHeight, maxWidth:"100%", maxHeight:"100%"}} />
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