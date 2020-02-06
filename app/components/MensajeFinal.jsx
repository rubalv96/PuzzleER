import React from "react";
import {Modal, Button} from 'react-bootstrap';
import {GLOBAL_CONFIG} from "../config/config";
import {objectiveAccomplished} from "../reducers/actions";

export default class MensajeFinal extends React.Component
{
  constructor(props){
    super(props);
    this.props.dispatch(objectiveAccomplished(1, 1));
  }
  reiniciar(){
    location.reload();
  }
  render()
  {

    let endImage;
    GLOBAL_CONFIG.endImage === "" ? endImage = "./assets/images/egipto.jpg" : endImage = GLOBAL_CONFIG.endImage;
    return (
      <>
        <Modal show animation={false} size="lg">
          <Modal.Header>
            <Modal.Title>Puzzle completado</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{GLOBAL_CONFIG.endMessage}</p>
            <img src={endImage} style={{width:300, height:200, display:"block", margin:"auto"}} alt={"Imagen de mensaje final."}/>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={this.reiniciar}>
              ¡Volver a jugar!
            </Button>
          </Modal.Footer>
        </Modal>
      </>);

  }

}