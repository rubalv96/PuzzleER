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

  return (
    <>
      <Modal backdrop="static" keyboard={false} show={props.show} animation={false} size="xl" >
        <Modal.Header>
          <Modal.Title className="endMessage">{GLOBAL_CONFIG.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign:"center"}}>
            <img src={props.srcImg} alt={"Imagen de la pieza"} style={{width:zoomWidth, height:"auto", maxWidth:"100%", maxHeight:"100%"}} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className={"btn btn-dark playButton"} variant="primary" onClick={()=>{props.zoomOff();}}>
            <p className="textPlayButton"><b>¡Seguir jugando!</b></p>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}