import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import NavBar from "./navBar";
// import FinishScreen from './FinishScreen.jsx';

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
import Attempts from "./Attempts";
import CluesMenu from "./CluesMenu";

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.aleatoriza = this.aleatoriza.bind(this);
    this.aleatoriza2 = this.aleatoriza2.bind(this);
    this.aleatorizaTrueFalse = this.aleatorizaTrueFalse.bind(this);
    this.seleccionarPieza = this.seleccionarPieza.bind(this);
    this.darVuelta = this.darVuelta.bind(this);
    this.iniciarPuzzle = this.iniciarPuzzle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.mostrarMsgFinal = this.mostrarMsgFinal.bind(this);
    this.ocultarMsgFinal = this.ocultarMsgFinal.bind(this);
    this.comprobarCompletado = this.comprobarCompletado.bind(this);
    this.compruebaEscapp = this.compruebaEscapp.bind(this);
    this.mostrarInstrucciones = this.mostrarInstrucciones.bind(this);
    this.ocultarInstrucciones = this.ocultarInstrucciones.bind(this);
    this.mostrarPistas = this.mostrarPistas.bind(this);
    this.ocultarPistas = this.ocultarPistas.bind(this);
    this.consumirPista = this.consumirPista.bind(this);
    this.iniciarPuzzle();
    let numIntentosComprobacion;
    let numIntentosPistas;
    GLOBAL_CONFIG.numberAttempts === "" ? numIntentosComprobacion = -1 : numIntentosComprobacion = GLOBAL_CONFIG.numberAttempts;
    GLOBAL_CONFIG.numberClues === "" ? numIntentosPistas = -1 : numIntentosPistas = GLOBAL_CONFIG.numberClues;
    this.state = {
      mostrarMsgFinal:false,
      mostrarMsgInicial:false,
      mostrarPistas:false,
      numIntentos:numIntentosComprobacion,
      numIntentosPistas: numIntentosPistas,

    };
  }

  render(){
    let appHeader = "";
    let appContent = "";
    // Variable para mostrar mensaje final si se ha completado
    let appEndMsg = "";

    if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
      appHeader = (
        <Header
          user_profile={this.props.user_profile}
          tracking={this.props.tracking}
          config={GLOBAL_CONFIG}
          I18n={I18n}/>);
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
            />

          </>
        );

      }
    }
    else {
      // appContent = (
      //   // <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile}
      //   //   tracking={this.props.tracking} quiz={SAMPLES.quiz_example} config={GLOBAL_CONFIG}
      //   //   I18n={I18n}/>
      // );
    }

    if(this.state.mostrarMsgFinal){

      if(GLOBAL_CONFIG.endMessage !== ""){
        appEndMsg = (<FinalMessage numIntentos={this.state.numIntentos} ocultar ={this.ocultarMsgFinal} puzzleCompleto={this.props.puzzleCompleto} dispatch={this.props.dispatch}/>);
      }
      // this.setState({mostrarMsgFinal: false});
    }
    let appInitialMsg;
    if(GLOBAL_CONFIG.initialMessage !== ""){
      appInitialMsg = (<InitialMessage ocultarInstrucciones={this.ocultarInstrucciones}/>);
    }

    let styleBackground = {
      "background":"linear-gradient(rgba(255,255,255," + GLOBAL_CONFIG.opacityBackground + "), rgba(255,255,255," + GLOBAL_CONFIG.opacityBackground + ")),url(" + GLOBAL_CONFIG.imageBackground + ")",
      "backgroundPosition":"center center",
      "backgroundRepeat":"no-repeat",
      "backgroundSize":"cover",
    };
    let msgIntentos;
    if(this.state.numIntentos === -1){
      msgIntentos = "Infinitos";
    }
    else {
      msgIntentos = this.state.numIntentos;
    }

    let instrucciones = "";
    if(this.state.mostrarMsgInicial){
      instrucciones = (<InitialMessage ocultarInstrucciones={this.ocultarInstrucciones}/>);
    }

    let pistas = "";
    if(this.state.mostrarPistas){
      pistas = (
                <CluesMenu piezas={this.props.piezas}
                           ocultarPistas={this.ocultarPistas}
                           consumirPista = {this.consumirPista}
                           numIntentosPistas = {this.state.numIntentosPistas}
      />);
    }
    return (
      <>

        <div id="container" style={styleBackground}>
          <NavBar mostrarInstrucciones={this.mostrarInstrucciones}
                  mostrarPistas={this.mostrarPistas}
                  numIntentos = {this.state.numIntentos}
                  numIntentosPistas = {this.state.numIntentosPistas}
          />
          <Instructions/>
          <h1 className="title">Generador de Puzzles</h1>
          {appInitialMsg}
          {appEndMsg}
          <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
          {appContent}
          {instrucciones}
          {pistas}
          <Attempts numIntentos={msgIntentos}/>
          {/* {appHeader}*/}

        </div>
      </>
    );
  }

  // Función para aleatorizar las posiciones y las imágenes para que no se repitan y sean acordes a las dimensiones
  aleatoriza(rowArray, colArray, arrayFinal){

    while(arrayFinal.length < (GLOBAL_CONFIG.N * GLOBAL_CONFIG.M)){
      let row = rowArray[Math.floor(Math.random() * GLOBAL_CONFIG.N)];
      let col = colArray[Math.floor(Math.random() * GLOBAL_CONFIG.M)];
      let array = [row, col];
      let estaIncluido = false;

      if(arrayFinal.length === 0){
        arrayFinal.push(array);
      } else {
        for(let i = 0; i < arrayFinal.length; i++){
          if(JSON.stringify(arrayFinal[i]) === JSON.stringify(array)){
            estaIncluido = true;
          }
        }
        if(!estaIncluido){
          arrayFinal.push(array);
        }
      }
    }

  }
  // Función aleatoria entre 0 y numPiezas
  aleatoriza2(numPiezas, arrayOrdenado){
    let i = 0;
    while(i < numPiezas){
      let num = Math.floor(Math.random() * GLOBAL_CONFIG.N * GLOBAL_CONFIG.M);
      if(arrayOrdenado.length === 0){
        arrayOrdenado.push(num);
        i++;
      } else if(!arrayOrdenado.includes(num)){
        arrayOrdenado.push(num);
        i++;
      }
    }
  }

  aleatorizaTrueFalse(){
    let bool;
    let num = Math.round(Math.random());
    num === 1 ? bool = true : bool = false;
    return bool;
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
    this.props.dispatch(iniciarPuzzle(GLOBAL_CONFIG.N, GLOBAL_CONFIG.M, this.aleatoriza, GLOBAL_CONFIG.Nextra * GLOBAL_CONFIG.Mextra, this.aleatoriza2, this.aleatorizaTrueFalse));
  }

  // Darle la vuelta a una pieza
  darVuelta(row, col){
    this.props.dispatch(darVuelta(row, col));

  }

  // Selección de una de las piezas
  seleccionarPieza(row, column){

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

  consumirPista(coste){
    if(coste <= this.state.numIntentosPistas){
      this.setState({numIntentosPistas: this.state.numIntentosPistas - coste});
      return true;
    }
    else{
      return false;
    }
  }
  comprobarCompletado(){
    this.props.dispatch(comprobarCompletado(this.props.piezas, GLOBAL_CONFIG.N, GLOBAL_CONFIG.M));
    if(this.state.numIntentos !== -1){
      this.setState({numIntentos:this.state.numIntentos - 1});
    }
    this.mostrarMsgFinal();
    // Llamada a API externa mediante la plataforma Escapp
    this.compruebaEscapp(GLOBAL_CONFIG.solution);

  }

  // Llamada a API externa mediante la plataforma Escapp
  compruebaEscapp(answer){
    fetch("https://escapp.dit.upm.es/api/escapeRooms/1/puzzles/5/check", {
      method:'POST',
      body:JSON.stringify({token:"ruben.alvarezg@alumnos.upm.es", solution:answer}),
      headers:{"Content-type":"application/json"},
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  mostrarInstrucciones(){
    this.setState({mostrarMsgInicial:true});

  }
mostrarPistas(){
    this.setState({mostrarPistas:true});
  }

  ocultarInstrucciones(){
    this.setState({mostrarMsgInicial:false});
  }

  ocultarPistas(){
    this.setState({mostrarPistas:false});
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);