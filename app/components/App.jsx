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

import {
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
    // this.compruebaEscapp = this.compruebaEscapp.bind(this);
    this.mostrarInstrucciones = this.mostrarInstrucciones.bind(this);
    this.ocultarInstrucciones = this.ocultarInstrucciones.bind(this);
    this.onStartTime = this.onStartTime.bind(this);
    this.lupa = this.lupa.bind(this);


    this.state = {
      mostrarMsgFinal:false,
      mostrarMsgInicial:false,
      onStartTime:false,
      temporizador:true,
      timeFinished:false,
      lupa: false,

    };
  }

  render(){
    let appContent = "";
    // Variable para mostrar mensaje final si se ha completado
    let appEndMsg = "";

    if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){

      if(this.props.wait_for_user_profile !== true){
        appContent = (
          <>


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
            />

            <ReactPlayer
              style={{display: "none"}}
              url={GLOBAL_CONFIG.backgroundMusic}
              volume = {GLOBAL_CONFIG.volume}
              loop
              playing
            />

          </>
        );
      }
    }

    if(this.state.mostrarMsgFinal){
      if(GLOBAL_CONFIG.endMessage !== ""){
        appEndMsg = (<FinalMessage numIntentos={this.state.numIntentos} ocultar ={this.ocultarMsgFinal} puzzleCompleto={this.props.puzzleCompleto} dispatch={this.props.dispatch} timeFinished={this.state.timeFinished}/>);
      }
    }
    let appInitialMsg;
    if(GLOBAL_CONFIG.initialMessage !== ""){
      appInitialMsg = (<InitialMessage temporizador={this.state.temporizador} ocultarInstrucciones={this.ocultarInstrucciones} onStartTime={this.onStartTime}/>);
    }
    let styleBackground = {
      "background":"linear-gradient(rgba(255,255,255," + GLOBAL_CONFIG.opacityBackground + "), rgba(255,255,255," + GLOBAL_CONFIG.opacityBackground + ")),url(" + GLOBAL_CONFIG.imageBackground + ")",
      "backgroundPosition":"center center",
      "backgroundRepeat":"no-repeat",
      "backgroundSize":"cover",
    };

    let instrucciones = "";
    if(this.state.mostrarMsgInicial){
      instrucciones = (<InitialMessage temporizador={this.state.temporizador} ocultarInstrucciones={this.ocultarInstrucciones} onStartTime={this.onStartTime}/>);
    }

    return (
      <>
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
          <h1 className="title">{GLOBAL_CONFIG.title}</h1>
          {appInitialMsg}
          {appEndMsg}
          <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
          {appContent}
          {instrucciones}


        </div>
      </>
    );
  }

  // Carga el inicio del puzzle
  iniciarPuzzle(){
    let numPiezasExtra = GLOBAL_CONFIG.Nextra * GLOBAL_CONFIG.Mextra;
    let numPiezasNoExtra = GLOBAL_CONFIG.N * GLOBAL_CONFIG.M;
    if(numPiezasExtra > numPiezasNoExtra){
      alert("Por favor, seleccione un numero de piezas falsas inferior o igual al número de piezas del puzzle. En su defecto el puzzle tomará el máximo de piezas falsas.");
      GLOBAL_CONFIG.Nextra = GLOBAL_CONFIG.N;
      GLOBAL_CONFIG.Mextra = GLOBAL_CONFIG.M;
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
      this.setState({timeFinished: true});
    }
    this.props.dispatch(comprobarCompletado(this.props.piezas, GLOBAL_CONFIG.N, GLOBAL_CONFIG.M));
    this.mostrarMsgFinal();
  }

  mostrarInstrucciones(){
    this.setState({mostrarMsgInicial:true, temporizador:false});
  }

  ocultarInstrucciones(){
    this.setState({mostrarMsgInicial:false});
  }

  onStartTime(){
    this.setState({onStartTime:true});
  }
  lupa(){
    this.setState({lupa: !this.state.lupa});
  }

  componentDidMount(){
    this.iniciarPuzzle();
  }
}
function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps)(App);