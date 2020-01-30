import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
// import * as SAMPLES from '../config/samples.js';
import SCORM from './SCORM.jsx';
// import Header from './Header.jsx';
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
import MensajeInicial from './MensajeInicial';
import MensajeFinal from "./MensajeFinal";

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.aleatoriza = this.aleatoriza.bind(this);
    this.seleccionarPieza = this.seleccionarPieza.bind(this);
    this.darVuelta = this.darVuelta.bind(this);
    this.iniciarPuzzle = this.iniciarPuzzle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.iniciarPuzzle();
  }

  render(){
    // let appHeader = "";
    let appContent = "";
    // Variable para mostrar mensaje final si se ha completado
    let appEndMsg = "";

    // if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
    //   appHeader = (
    //     <Header
    //       user_profile={this.props.user_profile}
    //       tracking={this.props.tracking}
    //       config={GLOBAL_CONFIG}
    //       I18n={I18n}/>);
    if(this.props.wait_for_user_profile !== true){
      appContent = (
        <>

          <Puzzle
            piezasSeleccionadas={this.props.piezasSeleccionadas}
            piezas={this.props.piezas}
            conf={GLOBAL_CONFIG}
            seleccionarPieza={this.seleccionarPieza}
            darVuelta = {this.darVuelta}
          />
          <div className="cont">
            <label className="switch" >
              <input type="checkbox" onClick={this.toggle}/>
              <span className="slider round" />
            </label>
          </div>
        </>
      );

    }
    // }
    // else {
    //   // appContent = (
    //   //   <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile}
    //   //     tracking={this.props.tracking} quiz={SAMPLES.quiz_example} config={GLOBAL_CONFIG}
    //   //     I18n={I18n}/>
    //   // );
    // }

    if(this.props.puzzleCompleto){
      appEndMsg = (<MensajeFinal/>);
    }

    return (
      <div id="container">
        <h1 className="title">Generador de Puzzles</h1>
        <MensajeInicial/>
        {appEndMsg}
        <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        {/* {appHeader}*/}
        {appContent}

      </div>
    );
  }

  //Función para aleatorizar las posiciones y las imágenes para que no se repitan y sean acordes a las dimensiones
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

  //Carga el inicio del puzzle
  iniciarPuzzle(){
    let rows = []; // rows=[1,2,3,4,5,...,N]

    for(let i = 1; i <= GLOBAL_CONFIG.N; i++){
      rows.push(i); // rows=[1,2,3,4,5,...,N]
    }

    let columns = []; // columns=[1,2,3,4,5,...,M]

    for(let i = 1; i <= GLOBAL_CONFIG.M; i++){
      columns.push(i); // columns=[1,2,3,4,5,...,M]
    }

    let arrayFinal = [];

    this.aleatoriza(rows, columns, arrayFinal);
    let puzzlePiezas = [];
    let rowIndex = 0;
    let columnIndex = 0;
    for(let k = 0; k < arrayFinal.length - 1; k++){
      // Se crea el objeto JSON con las piezas y sus posiciones
      // los parámetros row y column indican la posición donde se encuentran las piezas
      // los parámetros posRow y posCol indican las posiciones del trozo de imagen equivalente que se muestra al usuario

      puzzlePiezas = puzzlePiezas + " {\"posRow\": " + arrayFinal[k][0] + ", \"posCol\": " + arrayFinal[k][1] + ", \"row\": " + rows[rowIndex] + ", \"column\": " + columns[columnIndex] + ", \"numPuzzle\" : 1" + "},";
      columnIndex++;
      if(columnIndex === columns.length){
        columnIndex = 0;
        rowIndex++;
      }
    }
    let puzzleJSON = "[" + puzzlePiezas + " {\"posRow\": " + arrayFinal[arrayFinal.length - 1][0] + ", \"posCol\": " + arrayFinal[arrayFinal.length - 1][1] + ", \"row\": " + rows[rows.length - 1] + ", \"column\": " + columns[columns.length - 1] + ", \"numPuzzle\" : 1" + "}]";
    let puzzle = JSON.parse(puzzleJSON);
    this.props.dispatch(iniciarPuzzle(puzzle));

  }

  //Darle la vuelta a una pieza
  darVuelta(row, col){
    this.props.dispatch(darVuelta(row, col));
    this.props.dispatch(comprobarCompletado(this.props.piezas, GLOBAL_CONFIG.N, GLOBAL_CONFIG.M));

  }

  //Selección de una de las piezas
  seleccionarPieza(row, column){

    this.props.dispatch(seleccionarPieza(row, column));

    // Si hay dos piezas seleccionadas se lanza el dispatch de intercambiar
    if(this.props.piezasSeleccionadas[0][0] !== -1 && this.props.piezasSeleccionadas[1][0] !== -1){
      this.props.dispatch(intercambiarPiezas(this.props.piezasSeleccionadas));
      this.props.dispatch(comprobarCompletado(this.props.piezas, GLOBAL_CONFIG.N, GLOBAL_CONFIG.M));
    }

  }

  //Dar vuelta a todas las piezas
  toggle(){
    this.props.dispatch(darVueltaTodas());
    this.props.dispatch(comprobarCompletado(this.props.piezas, GLOBAL_CONFIG.N, GLOBAL_CONFIG.M));

  }

}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);