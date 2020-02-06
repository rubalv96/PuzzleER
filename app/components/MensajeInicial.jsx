import React, {useState} from "react";
import {GLOBAL_CONFIG} from "../config/config";
import {Modal, Button} from 'react-bootstrap';

export default function MensajeInicial(){
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  let initialImage;
  GLOBAL_CONFIG.initialImage === "" ? initialImage = "./assets/images/egipto.jpg" : initialImage = GLOBAL_CONFIG.initialImage;
  return (
    <>

      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resuelve el puzzle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{GLOBAL_CONFIG.initialMessage}</p>

          <img src={initialImage} style={{width:300, height:200, display:"block", margin:"auto"}} alt={"Imagen de mensaje inicial."}/>

        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={handleClose}>
                        ¡Jugar!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}