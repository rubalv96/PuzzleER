import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as I18n from '../vendors/I18n.js';
import * as SAMPLES from '../config/samples.js';

import SCORM from './SCORM.jsx';
import Header from './Header.jsx';
import FinishScreen from './FinishScreen.jsx';
//import Quiz from './Quiz.jsx';
import Puzzle from './Puzzle';
import {iniciarPuzzle, seleccionarPieza, intercambiarPiezas} from '../reducers/actions';

export class App extends React.Component {
  constructor(props){
    super(props);
    I18n.init();
    this.aleatoriza=this.aleatoriza.bind(this);
    this.seleccionarPieza=this.seleccionarPieza.bind(this);
    this.iniciarPuzzle=this.iniciarPuzzle.bind(this);
    this.iniciarPuzzle();

  }
  render(){
    let appHeader = "";
    let appContent = "";

    console.log( this.props.piezasSeleccionadas);

    if((this.props.tracking.finished !== true) || (GLOBAL_CONFIG.finish_screen === false)){
      appHeader = (
        <Header user_profile={this.props.user_profile} tracking={this.props.tracking} config={GLOBAL_CONFIG} I18n={I18n}/>
      );
      if(this.props.wait_for_user_profile !== true){
        appContent = (


            <Puzzle piezasSeleccionadas= {this.props.piezasSeleccionadas} piezas={this.props.piezas} conf={GLOBAL_CONFIG} seleccionarPieza={this.seleccionarPieza}></Puzzle>




         // <Quiz dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={SAMPLES.quiz_example} config={GLOBAL_CONFIG} I18n={I18n}/>
        )

      }
    } else {
      appContent = (
        <FinishScreen dispatch={this.props.dispatch} user_profile={this.props.user_profile} tracking={this.props.tracking} quiz={SAMPLES.quiz_example} config={GLOBAL_CONFIG} I18n={I18n}/>
      );
    }

    return(

    <div id="container">
        <h1>Puzzle</h1>

        <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        {appHeader}
        {appContent}

      </div>
    );
  }

  aleatoriza(rowArray,colArray, arrayFinal){


    while(arrayFinal.length<(GLOBAL_CONFIG.N * GLOBAL_CONFIG.M)) {
      var row= rowArray[Math.floor(Math.random()*GLOBAL_CONFIG.N)];
      var col= colArray[Math.floor(Math.random()*GLOBAL_CONFIG.M)];
      var array= [row,col];
      var prueba=0;
      if (arrayFinal.length === 0) {
        arrayFinal.push(array);
      } else {
        for (var i = 0; i < arrayFinal.length; i++) {
          if (JSON.stringify(arrayFinal[i])!=JSON.stringify(array)) {
            prueba++;
          }
        }
        if(prueba===arrayFinal.length){
          arrayFinal.push(array);
        }
      }
    }

  }


 iniciarPuzzle(){
    var rows= []; //rows=[1,2,3,4,5,...,N]

    for(var i=1; i<=GLOBAL_CONFIG.N; i++){
      rows.push(i);
    }

    var columns= []; //rows=[1,2,3,4,5,...,N]

    for(var i=1; i<=GLOBAL_CONFIG.M; i++){
      columns.push(i);
    }

    var arrayFinal=[];

    this.aleatoriza(rows,columns,arrayFinal);
    //Genero JSON
    puzzlePiezas=[];
    var ri=0;
    var ci=0;
    for (var k=0; k<arrayFinal.length-1; k++) {
      var puzzlePiezas = puzzlePiezas +" {\"posRow\": " + arrayFinal[k][0] + ", \"posCol\": " + arrayFinal[k][1] + ", \"row\": " + rows[ri] + ", \"column\": " + columns[ci] + "},";
      ci ++;
      if(ci === columns.length){
        ci=0;
        ri++;
      }
    }
    var puzzleJSON = "[" + puzzlePiezas +" {\"posRow\": " + arrayFinal[arrayFinal.length-1][0] + ", \"posCol\": " + arrayFinal[arrayFinal.length-1][1] + ", \"row\": " + rows[rows.length-1] + ", \"column\": " + columns[columns.length-1] + "}" + "]";
    //acción de inicialización y le paso como parámetro puzzleJSON

    var puzzle=JSON.parse(puzzleJSON);


   this.props.dispatch(iniciarPuzzle(puzzle));


  }

  seleccionarPieza(row, column){
      console.log("Ejecuto seleccionar pieza!")
      this.props.dispatch(seleccionarPieza(row,column));
      console.log(this.props.piezasSeleccionadas);
      //Si hay dos piezas seleccionadas hago el dispatch de intercambiar
      if(this.props.piezasSeleccionadas[0][0] !== -1 && this.props.piezasSeleccionadas[1][0] !== -1){
          this.props.dispatch(intercambiarPiezas(this.props.piezasSeleccionadas));
          console.log("FINAL2: "+ this.props.piezas[0].posRow);
      }
  }


}


function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);