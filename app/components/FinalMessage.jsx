import React from "react";
import {Modal, Button} from 'react-bootstrap';
let GLOBAL_CONFIG = require('../config/config.js');
import {objectiveAccomplished} from "../reducers/actions";
import ReactPlayer from "react-player";

export default class FinalMessage extends React.Component
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
      (GLOBAL_CONFIG.endImageSuccess === "" || GLOBAL_CONFIG.endImageSuccess === undefined) ? endImage = "" : endImage =
          (
            <img src={GLOBAL_CONFIG.endImageSuccess} style={{width:300, height:200, display:"block", margin:"auto", borderRadius:"10px"}} alt={"Imagen de mensaje final."}/>

          );
    }
    else {
      (GLOBAL_CONFIG.endImageFail === "" || GLOBAL_CONFIG.endImageFail === undefined) ? endImage = "" : endImage =
          (
            <img src={GLOBAL_CONFIG.endImageFail} style={{width:300, height:200, display:"block", margin:"auto", borderRadius:"10px"}} alt={"Imagen de mensaje final."}/>

          );
    }

    let titulo;
    this.props.puzzleCompleto ? titulo = "Puzzle completado" : titulo = "Puzzle incorrecto";

    let msg;
    this.props.puzzleCompleto ? msg = GLOBAL_CONFIG.endMessageSuccess : msg = GLOBAL_CONFIG.endMessageFail;

    let btnSeguir;
    (!this.props.timeFinished && !this.props.puzzleCompleto) ? btnSeguir = <Button className={"btn btn-dark"} onClick={this.ocultar}>Seguir jugando</Button> : btnSeguir = "";

    if(!this.props.puzzleCompleto){
      msg = GLOBAL_CONFIG.endMessageFail;
    }
    return (
      <React.Fragment>
        <Modal show={this.state.showModal} animation={false} size="lg">
          <Modal.Header>
            <Modal.Title style={{fontSize:"45px", fontFamily:"'Megrim', cursive"}}>{titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{fontSize:"25px", fontFamily:"'Megrim', cursive"}}>{msg}</p>
            {endImage}
          </Modal.Body>
          <Modal.Footer>
            {btnSeguir}
          </Modal.Footer>
        </Modal>
        <ReactPlayer
          style={{display:"none"}}
          url={GLOBAL_CONFIG.successMusic}
          volume = {GLOBAL_CONFIG.volume}
          playing={this.props.puzzleCompleto}
        />
        <ReactPlayer
          style={{display:"none"}}
          url={GLOBAL_CONFIG.failureMusic}
          volume = {GLOBAL_CONFIG.volume}
          playing={!this.props.puzzleCompleto}
        />
      </React.Fragment>
    );
  }
}