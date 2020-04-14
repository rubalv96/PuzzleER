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
    this.hide = this.hide.bind(this);
  }

  close(){
    this.setState({showModal:false});
  }

  hide(){
    this.close();
    this.props.hide();
  }
  render()
  {

    let endImage;
    if(this.props.puzzleCompleto){
      (GLOBAL_CONFIG.endImageSuccess === "" || GLOBAL_CONFIG.endImageSuccess === undefined) ? endImage = "" : endImage =
          (
            <img
              src={GLOBAL_CONFIG.endImageSuccess}
              className="endImage"
              alt={"Success Image"}/>

          );
    }
    else {
      (GLOBAL_CONFIG.endImageFail === "" || GLOBAL_CONFIG.endImageFail === undefined) ? endImage = "" : endImage =
          (
            <img
              src={GLOBAL_CONFIG.endImageFail}
              className="endImage"
              alt={"Failed Image"}/>
          );
    }

    let title;
    this.props.puzzleCompleto ? title = "Puzzle completado" : title = "Puzzle incorrecto";

    let msg;
    this.props.puzzleCompleto ? msg = GLOBAL_CONFIG.endMessageSuccess : msg = GLOBAL_CONFIG.endMessageFail;

    let continueButton;
    (!this.props.timeFinished && !this.props.puzzleCompleto) ? continueButton = <Button className={"btn btn-dark"} onClick={this.hide}>Seguir jugando</Button> : continueButton = "";

    if(!this.props.puzzleCompleto){
      msg = GLOBAL_CONFIG.endMessageFail;
    }
    return (
      <React.Fragment>
        <Modal show={this.state.showModal} animation={false} size="lg" onHide={() => false}>
          <Modal.Header>
            <Modal.Title className="endTitle">{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="endMessage">{msg}</p>
            {endImage}
          </Modal.Body>
          <Modal.Footer>
            {continueButton}
          </Modal.Footer>
        </Modal>
        <ReactPlayer
          className="player"
          url={GLOBAL_CONFIG.successMusic}
          volume = {GLOBAL_CONFIG.volume}
          playing={this.props.puzzleCompleto}
        />
        <ReactPlayer
          className="player"
          url={GLOBAL_CONFIG.failureMusic}
          volume = {GLOBAL_CONFIG.volume}
          playing={!this.props.puzzleCompleto}
        />
      </React.Fragment>
    );
  }
}