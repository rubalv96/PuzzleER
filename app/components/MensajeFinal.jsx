import React from "react";
import {Modal, Button} from 'react-bootstrap';
import {GLOBAL_CONFIG} from "../config/config";
import {objectiveAccomplished} from "../reducers/actions";

export default class MensajeFinal extends React.Component
{
  constructor(props){
    super(props);
    this.props.dispatch(objectiveAccomplished(1, 1));
    this.state = {
      showModal:true,
    };
    this.close = this.close.bind(this);
    this.ocultar = this.ocultar.bind(this);
  }

  close(){
    this.setState({showModal:false});
  }

  ocultar(){
    this.close();
    this.props.ocultar();
  }
  render()
  {

    let endImage;
    if(this.props.puzzleCompleto){
      GLOBAL_CONFIG.endImageSuccess === "" ? endImage = "./assets/images/egipto.jpg" : endImage = GLOBAL_CONFIG.endImageSuccess;
    }
    else {
      GLOBAL_CONFIG.endImageFail === "" ? endImage = "./assets/images/noruega.jpg" : endImage = GLOBAL_CONFIG.endImageFail;
    }

    let titulo;
    this.props.puzzleCompleto ? titulo = "Puzzle completado" : titulo = "Puzzle incorrecto.";

    let msg;
    this.props.puzzleCompleto ? msg = GLOBAL_CONFIG.endMessageSuccess : msg = GLOBAL_CONFIG.endMessageFail;

    let btnSeguir;
    (!this.props.puzzleCompleto) ? btnSeguir = <Button onClick={this.ocultar}>Seguir jugando</Button> : btnSeguir = "";

    if(this.props.numIntentos===0 && !this.props.puzzleCompleto) {
      msg = GLOBAL_CONFIG.endMessageFail;
      btnSeguir ="";
    }
    return (
      <>
        <Modal show={this.state.showModal} animation={false} size="lg">
          <Modal.Header>
            <Modal.Title>{titulo}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{msg}</p>
            <img src={endImage} style={{width:300, height:200, display:"block", margin:"auto"}} alt={"Imagen de mensaje final."}/>
          </Modal.Body>

          <Modal.Footer>
            {btnSeguir}

          </Modal.Footer>
        </Modal>
      </>);

  }

}