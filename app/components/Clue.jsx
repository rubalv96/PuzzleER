import React, {useState} from "react";
// import {GLOBAL_CONFIG} from "../config/config";
import {Toast, Row, Col, Button} from 'react-bootstrap';
export default function Clue(props){
  const [show, setShow] = useState(false);
  // const [hayIntentos, setHayIntentos] = useState((parseInt(props.coste) > parseInt(props.numIntentosPistas)));
  return (
    <Row>
      <Col xs={6}>
        {/* eslint-disable-next-line radix */}
        <Button disabled={(parseInt(props.coste) > parseInt(props.numIntentosPistas))}
          onClick={() => {
            if(props.consumirPista(props.coste)){
              setShow(true);
            }
          }
          }>
          {props.nombreTitulo}
          <div>
            <p style={{display:"inline"}}>{props.coste} </p><img style={{display:"inline"}} width="596" src="../assets/images/intentos.png" alt={"Numero de intentos"}/>
          </div>
        </Button>
      </Col>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={props.tiempoVisible} autohide>
          <Toast.Header>
            <img
              src="../assets/images/intentos.png"
              width="596"
              height="585"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Pista obtenida</strong>
            {/* <small>11 mins ago</small>*/}
          </Toast.Header>
          <Toast.Body>{props.respuesta}</Toast.Body>
        </Toast>
      </Col>

    </Row>
  );
}