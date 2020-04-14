import React from 'react';
import ReactPlayer from "react-player";
import {connect} from 'react-redux';
import './../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
let GLOBAL_CONFIG = require('../config/config.js');
console.log(GLOBAL_CONFIG);
import * as I18n from '../vendors/I18n.js';
import SCORM from './SCORM.jsx';
import NavBar from "./navBar";
import Puzzle from './Puzzle';
import ZoomPiece from "./ZoomPiece";
import {
  loaded,
  iniciarPuzzle,
  seleccionarPieza,
  intercambiarPiezas,
  darVuelta,
  darVueltaTodas,
  comprobarCompletado,
} from '../reducers/actions';
import InitialMessage from './InitialMessage';
import FinalMessage from "./FinalMessage";
import Instructions from "./Instructions";

let escapp;

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.seleccionarPieza = this.seleccionarPieza.bind(this);
    this.darVuelta = this.darVuelta.bind(this);
    this.iniciarPuzzle = this.iniciarPuzzle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.mostrarMsgFinal = this.mostrarMsgFinal.bind(this);
    this.ocultarMsgFinal = this.ocultarMsgFinal.bind(this);
    this.comprobarCompletado = this.comprobarCompletado.bind(this);
    this.mostrarInstrucciones = this.mostrarInstrucciones.bind(this);
    this.ocultarInstrucciones = this.ocultarInstrucciones.bind(this);
    this.onStartTime = this.onStartTime.bind(this);
    this.lupa = this.lupa.bind(this);
    this.zoomImage = this.zoomImage.bind(this);
    this.zoomOff = this.zoomOff.bind(this);
    this.restoreState = this.restoreState.bind(this);

    this.state = {
      mostrarMsgFinal:false,
      mostrarMsgInicial:false,
      onStartTime:false,
      temporizador:true,
      timeFinished:false,
      lupa:false,
      showZoom:false,
      zoomImgPath:"",
      widthPiece:0,
      heightPiece:0,
      playing_music:false,
      isExtraPiece:false,
    };
  }
  componentDidMount(){
    escapp = new ESCAPP(GLOBAL_CONFIG.escapp);
    // escapp.reset(); //Uncomment for removing local data storage
    escapp.validate(function(success, er_state){
      if(success){
        this.restoreState(er_state);
      }
    }.bind(this));
  }
  restoreState(er_state){
    if(er_state.puzzlesSolved.length > 0){
      let puzzleId = GLOBAL_CONFIG.escapp.appPuzzleIds[0];
      if(er_state.puzzlesSolved.indexOf(puzzleId) !== -1){
        // Puzzle already solved
        if((typeof er_state.puzzleData === "object") && (typeof er_state.puzzleData[puzzleId] === "object")){
          let puzzleData = er_state.puzzleData[puzzleId];
          let message = puzzleData.msg;
          if((typeof message === "string") && (message.trim() !== "")){
            GLOBAL_CONFIG.endMessageSuccess = message;
            // Finish app
            this.props.dispatch(comprobarCompletado(true));
            this.setState({"mostrarMsgInicial":false, "mostrarMsgFinal":true});
            this.mostrarMsgFinal();
          }
        }
      }
    }
    this.iniciarPuzzle();
    // this.props.dispatch(loaded(true)); //'iniciarPuzzle()'' will change loading to false.
  }

  render(){
    let appContent = "";
    // Variable para mostrar mensaje final si se ha completado
    let appEndMsg = "";

    if(this.props.loading === true){
      // Wait for loading
      return null;
    }

    if((this.props.tracking.finished !== true) || (this.props.wait_for_user_profile !== true)){
      appContent = (
        <React.Fragment>
          <Puzzle
            piezasSeleccionadas={this.props.piezasSeleccionadas}
            piezas={this.props.piezas}
            conf={GLOBAL_CONFIG}
            seleccionarPieza={this.seleccionarPieza}
            darVuelta = {this.darVuelta}
            toggle = {this.toggle}
            comprobarCompletado={this.comprobarCompletado}
            dispatch={this.props.dispatch}
            lupa={this.state.lupa}
            zoomImage={this.zoomImage}
          />
          <ReactPlayer
            style={{display:"none"}}
            url={GLOBAL_CONFIG.backgroundMusic}
            volume = {GLOBAL_CONFIG.volume}
            loop
            playing = {this.state.playing_music}
          />
        </React.Fragment>
      );
    }

    if(this.state.mostrarMsgFinal){
      if(GLOBAL_CONFIG.endMessage !== ""){
        appEndMsg = (<FinalMessage numIntentos={this.state.numIntentos} ocultar ={this.ocultarMsgFinal} puzzleCompleto={this.props.puzzleCompleto} dispatch={this.props.dispatch} timeFinished={this.state.timeFinished}/>);
      }
    }
    let appInitialMsg;
    if((GLOBAL_CONFIG.initialMessage !== "") && (this.props.puzzleCompleto !== true)){
      appInitialMsg = (<InitialMessage temporizador={this.state.temporizador} ocultarInstrucciones={this.ocultarInstrucciones} onStartTime={this.onStartTime}/>);
    }
    let opacity;
    GLOBAL_CONFIG.opacityBackground === "" ? opacity = "0" : opacity = GLOBAL_CONFIG.opacityBackground;
    let styleBackground = {
      "background":"linear-gradient(rgba(255,255,255," + opacity + "), rgba(255,255,255," + opacity + ")),url(" + GLOBAL_CONFIG.imageBackground + ")",
      "backgroundPosition":"center center",
      "backgroundRepeat":"no-repeat",
      "backgroundSize":"cover",
    };

    let instrucciones = "";
    if((this.state.mostrarMsgInicial) && (this.props.puzzleCompleto !== true)){
      instrucciones = (<InitialMessage temporizador={this.state.temporizador} ocultarInstrucciones={this.ocultarInstrucciones} onStartTime={this.onStartTime}/>);
    }

    return (
      <React.Fragment>
        <div id="container" style={styleBackground}>
          <NavBar mostrarInstrucciones={this.mostrarInstrucciones}
            dispatch = {this.props.dispatch}
            onFinishTime={this.comprobarCompletado}
            onStartTime={this.state.onStartTime}
            conf = {GLOBAL_CONFIG}
            toggle = {this.toggle}
            comprobarCompletado = {this.comprobarCompletado}
            lupa={this.lupa}
            lupaValue={this.state.lupa}
          />
          <Instructions/>
          {appInitialMsg}
          {appEndMsg}
          {appContent}
          {instrucciones}
          <ZoomPiece show={this.state.showZoom}
            srcImg={this.state.zoomImgPath}
            zoomOff ={this.zoomOff}
            widthPiece={this.state.widthPiece}
            heightPiece={this.state.heightPiece}
            isExtraPiece={this.state.isExtraPiece}
          />
          <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        </div>
      </React.Fragment>
    );
  }

  // Carga el inicio del puzzle
  iniciarPuzzle(){
    let numPiezasExtra = GLOBAL_CONFIG.fake_pieces;
    let numPiezasNoExtra = GLOBAL_CONFIG.N * GLOBAL_CONFIG.M;
    if(numPiezasExtra > numPiezasNoExtra){
      alert("Por favor, seleccione un numero de piezas falsas inferior o igual al número de piezas del puzzle. En su defecto el puzzle tomará el máximo de piezas falsas.");
      GLOBAL_CONFIG.fake_pieces = numPiezasNoExtra;
    }
    this.props.dispatch(iniciarPuzzle());
  }
  // Darle la vuelta a una pieza
  darVuelta(row, col){
    this.props.dispatch(darVuelta(row, col));
  }
  // Selección de una de las piezas
  seleccionarPieza(row, column){
    // if(!this.state.lupa){
    this.props.dispatch(seleccionarPieza(row, column));
    // Si hay dos piezas seleccionadas se lanza el dispatch de intercambiar
    if(this.props.piezasSeleccionadas[0][0] !== -1 && this.props.piezasSeleccionadas[1][0] !== -1){
      this.props.dispatch(intercambiarPiezas(this.props.piezasSeleccionadas));
    }

  }

  // Dar vuelta a todas las piezas
  toggle(){
    this.props.dispatch(darVueltaTodas());
  }

  mostrarMsgFinal(){
    this.setState({mostrarMsgFinal:true});
  }

  ocultarMsgFinal(){
    this.setState({mostrarMsgFinal:false});
  }

  comprobarCompletado(flag){
    if(flag === "gameover"){
      this.setState({timeFinished:true});
    }

    // Comprueba si se ha completado el puzzle
    let solution = "";
    for(let row = 1; row <= GLOBAL_CONFIG.N; row++){
      for(let col = 1; col <= GLOBAL_CONFIG.M; col++){
        for(let p in this.props.piezas){
          let pieza = this.props.piezas[p];
          if(pieza.row === row && pieza.column === col){
            solution = solution + pieza.faceImgId;
            break;
          }
        }
      }
    }
    escapp.submitPuzzle(GLOBAL_CONFIG.escapp.appPuzzleIds[0], solution, {}, function(success, res){
      this.props.dispatch(comprobarCompletado(success));
      if(success){
        let message = res.msg;
        if((typeof message === "string") && (message.trim() != "")){
          GLOBAL_CONFIG.endMessageSuccess = message;
        }
      }
      this.mostrarMsgFinal();
    }.bind(this));
  }

  mostrarInstrucciones(){
    this.setState({mostrarMsgInicial:true, temporizador:false});
  }

  ocultarInstrucciones(){
    this.setState({mostrarMsgInicial:false});
    this.setState({playing_music:true});
  }

  onStartTime(){
    this.setState({onStartTime:true});
  }
  lupa(){
    this.setState({lupa:!this.state.lupa});
  }

  zoomImage(img, width, height, isExtraPiece){
    this.setState({showZoom:true, zoomImgPath:img, widthPiece:width, heightPiece:height, isExtraPiece:isExtraPiece});
  }

  zoomOff(){
    this.setState({showZoom:false});
  }

  dimensionsExtraAreaPrint(){
    let fake_pieces = GLOBAL_CONFIG.fake_pieces;

  }
}

function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps)(App);