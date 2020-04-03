import React, {useState} from "react";
let GLOBAL_CONFIG = require('../config/config.js');
import {Modal, Button, CardGroup, Card, Tab, Tabs, Sonnet} from 'react-bootstrap';
import Timer from "./Timer";
import './../assets/scss/main.scss';

export default function InitialMessage(props){
  const [show, setShow] = useState(true);
  const [enable, setEnable] = useState(GLOBAL_CONFIG.timeToReadInstructions === undefined || GLOBAL_CONFIG.timeToReadInstructions < 1);
  const handleClose = () => setShow(false);

  let timeToReadInstructions;
  (GLOBAL_CONFIG.timeToReadInstructions === undefined || GLOBAL_CONFIG.timeToReadInstructions < 1) ?
    timeToReadInstructions = "" : timeToReadInstructions = GLOBAL_CONFIG.timeToReadInstructions;

  let timer;
  (props.temporizador && timeToReadInstructions !== "") ? timer = (
    <div style={{display:!enable ? 'block' : 'none'}}>
      <Timer time={timeToReadInstructions} showMinutes={false} onStartTime onFinishTime={()=>{setEnable(true);}} />
    </div>
  ) : timer = "";

  let initialImage;
  (GLOBAL_CONFIG.initialImage === "" || GLOBAL_CONFIG.initialImage === undefined) ? initialImage = "" : initialImage =
      (
        <img src={GLOBAL_CONFIG.initialImage} style={{width:300, height:200, display:"block", margin:"auto", borderRadius:"10px"}} alt={"Imagen de mensaje inicial."}/>

      );

  let titulo = "";
  if(GLOBAL_CONFIG.title !== undefined){
    titulo = GLOBAL_CONFIG.title;
  }

  let styleCards = {maxWidth:"70px", margin:"auto", marginTop:"10px"};

  let goalCard = "";
  goalCard = (
    <Card>
      <Card.Img style={styleCards} src="./assets/icons/goal.svg"/>
      <Card.Body>
        <Card.Title><b>Objetivo</b></Card.Title>
        <Card.Text >
            Ordenar las piezas para dar con la solución.
        </Card.Text>
      </Card.Body>

    </Card>
  );

  let flipPieceCard = "";

  GLOBAL_CONFIG.reverseMode ? flipPieceCard = (
    <Card>
      <Card.Img style={styleCards} src="./assets/icons/flip_piece.svg"/>
      <Card.Body>
        <Card.Title><b>Piezas reversibles</b></Card.Title>
        <Card.Text>
            Para dar la vuelta a una pieza se debe hacer doble click sobre ella.
        </Card.Text>
      </Card.Body>

    </Card>
  ) : flipPieceCard = "";

  let interchangeCard = "";
  interchangeCard = (
    <Card>
      <Card.Img style={styleCards} src="./assets/icons/interchange.svg"/>
      <Card.Body>
        <Card.Title><b>Intercambio de piezas</b></Card.Title>
        <Card.Text>
          Mediante un click se selecciona la pieza y se deposita con otro click en el lugar de destino.
        </Card.Text>
      </Card.Body>

    </Card>
  );

  let extraCard = "";
  (GLOBAL_CONFIG.Nextra > 0) ? extraCard = (
    <Card>
      <Card.Img style={styleCards} src="./assets/icons/extra.svg"/>
      <Card.Body>
        <Card.Title><b>Piezas señuelo</b></Card.Title>
        <Card.Text>
       Las piezas que no pertenezcan al puzzle se depositarán en la parte derecha.
        </Card.Text>
      </Card.Body>

    </Card>
  ) : extraCard = "";

  let flipCard = "";
  GLOBAL_CONFIG.reverseMode ? flipCard = (
    <Card>
      <Card.Img style={styleCards} src="./assets/icons/flip.svg"/>
      <Card.Body>
        <Card.Title><b>Revertir piezas</b></Card.Title>
        <Card.Text>
            Dar la vuelta a todas las piezas simultáneamente.
        </Card.Text>
      </Card.Body>

    </Card>
  ) : flipCard = "";

  let zoomCard = "";
  GLOBAL_CONFIG.zoomMode ? zoomCard = (
    <Card>
      <Card.Img style={styleCards} src="./assets/icons/zoom-in.svg"/>
      <Card.Body>
        <Card.Title><b>Zoom</b></Card.Title>
        <Card.Text>
            Activar y desactivar la opción de Zoom sobre las piezas.
        </Card.Text>
      </Card.Body>

    </Card>
  ) : zoomCard = "";

  let iconCards = "";
  iconCards = (
    <CardGroup>
      <Card>
        <Card.Img style={styleCards} src="./assets/icons/instructions.svg"/>
        <Card.Body>
          <Card.Title><b>¿Cómo jugar?</b></Card.Title>
          <Card.Text>
       Volver a leer las instrucciones de juego
          </Card.Text>
        </Card.Body>

      </Card>
      {flipCard}
      {zoomCard}

      <Card>
        <Card.Img style={styleCards} src="./assets/icons/solution.svg"/>
        <Card.Body>
          <Card.Title><b>Comprobar solución</b></Card.Title>
          <Card.Text>
        Comprobar la solución actual del puzzle.
          </Card.Text>
        </Card.Body>

      </Card>
    </CardGroup>
  );
  return (
    <>
      <Modal backdrop="static" keyboard={false} show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header>
          <Modal.Title style={{fontSize:"45px", fontFamily:"'Megrim', cursive"}}>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="tab">
          <Tabs defaultActiveKey="instructions" id="uncontrolled-tab-example" >

            <Tab eventKey="instructions" title="Cómo jugar" >
              <p style={{fontSize:"25px", fontFamily:"'Delius', cursive", margin:"15px"}}><b>Instrucciones</b></p>
              <CardGroup>
                {goalCard}
                {interchangeCard}
                {flipPieceCard}
                {extraCard}

              </CardGroup>

              <p style={{fontSize:"25px", fontFamily:"'Delius', cursive", margin:"15px"}}><b>Iconos</b></p>

              {iconCards}

            </Tab>
            <Tab eventKey="story" title="Historia">
              <p
                style={{fontSize:"20px", fontFamily:"'Delius', cursive", marginTop:"15px"}}
              >
                <b>{GLOBAL_CONFIG.initialMessage}</b>
                {initialImage}

              </p>

            </Tab>

          </Tabs>

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