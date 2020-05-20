import React from 'react';
import {connect} from 'react-redux';
import './../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as I18n from '../vendors/I18n.js';

let GLOBAL_CONFIG = require('../config/config.js');
console.log(GLOBAL_CONFIG);

import {
  loaded,
  updatePieces,
  selectPiece,
  checkSolution,
} from '../reducers/actions';

import ReactPlayer from "react-player";
import SCORM from './SCORM.jsx';
import NavBar from "./NavBar";
import PuzzlesGroup from './PuzzlesGroup';
import ZoomPiece from "./ZoomPiece";
import InitialMessage from './InitialMessage';
import FinalMessage from "./FinalMessage";
import PrintInstructions from "./PrintInstructions";

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
    this.loadInitialPuzzle = this.loadInitialPuzzle.bind(this);
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
            this.props.dispatch(checkSolution(true));
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
    let appEndMsg = "";

    if(this.props.loading === true){
      // Wait for loading
      return null;
    }
    // Puzzle and Player components
    if((this.props.tracking.finished !== true) || (this.props.wait_for_user_profile !== true)){
      console.log("appContent");
      appContent = (
        <React.Fragment>
          <PuzzlesGroup
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
            className="player"
            url={GLOBAL_CONFIG.backgroundMusic}
            volume = {GLOBAL_CONFIG.volume}
            loop
            playing = {this.state.playing_music}
          />
        </React.Fragment>
      );
    }

    // Final message component
    if(this.state.mostrarMsgFinal && GLOBAL_CONFIG.endMessage !== ""){
      appEndMsg = (<FinalMessage hide ={this.ocultarMsgFinal} puzzleCompleto={this.props.puzzleCompleto} dispatch={this.props.dispatch} timeFinished={this.state.timeFinished}/>);
    }

    // Initial message component
    let appInitialMsg;
    if((GLOBAL_CONFIG.initialMessage !== "") && (this.props.puzzleCompleto !== true)){
      appInitialMsg = (<InitialMessage temporizador={this.state.temporizador} ocultarInstrucciones={this.ocultarInstrucciones} onStartTime={this.onStartTime}/>);
    }

    // Image background
    let opacity;
    GLOBAL_CONFIG.opacityBackground === "" ? opacity = "0" : opacity = GLOBAL_CONFIG.opacityBackground;
    let styleBackground = {
      "background":"linear-gradient(rgba(255,255,255," + opacity + "), rgba(255,255,255," + opacity + ")),url(" + GLOBAL_CONFIG.imageBackground + ")",
    };

    // Instructions component
    let instrucciones = "";
    if((this.state.mostrarMsgInicial) && (this.props.puzzleCompleto !== true)){
      instrucciones = (<InitialMessage temporizador={this.state.temporizador} ocultarInstrucciones={this.ocultarInstrucciones} onStartTime={this.onStartTime}/>);
    }

    // Navigation bar component
    let navBar = (
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
    );

    // Print Instructions (only visible on Print View)
    let printInstructions = (
      <PrintInstructions/>
    );

    // Piece when doing zoom over it
    let zoomPiece = (
      <ZoomPiece show={this.state.showZoom}
        srcImg={this.state.zoomImgPath}
        zoomOff ={this.zoomOff}
        widthPiece={this.state.widthPiece}
        heightPiece={this.state.heightPiece}
        isExtraPiece={this.state.isExtraPiece}
      />
    );

    return (
      <React.Fragment>
        <div id="container" style={styleBackground}>
          {navBar}
          {appInitialMsg}
          {appContent}
          {instrucciones}
          {printInstructions}
          {zoomPiece}
          {appEndMsg}
          <SCORM dispatch={this.props.dispatch} tracking={this.props.tracking} config={GLOBAL_CONFIG}/>
        </div>
      </React.Fragment>
    );
  }

  // Load the board of puzzle
  iniciarPuzzle(){
    let initialPieces = this.loadInitialPuzzle();
    this.props.dispatch(updatePieces(initialPieces));
  }

  loadInitialPuzzle(){
    let numPiezasExtra = GLOBAL_CONFIG.fake_pieces;
    let numPiezasNoExtra = GLOBAL_CONFIG.N * GLOBAL_CONFIG.M;
    if(numPiezasExtra > numPiezasNoExtra){
      alert("Por favor, seleccione un numero de piezas falsas inferior o igual al número de piezas del puzzle. En su defecto el puzzle tomará el máximo de piezas falsas.");
      GLOBAL_CONFIG.fake_pieces = numPiezasNoExtra;
    }
    let puzzle = [];
    let shufflePieces = this.shuffle(GLOBAL_CONFIG.pieces);
    let piezas = shufflePieces.slice(0, GLOBAL_CONFIG.M * GLOBAL_CONFIG.N);
    let piezasExtra = shufflePieces.slice(GLOBAL_CONFIG.M * GLOBAL_CONFIG.N, GLOBAL_CONFIG.M * GLOBAL_CONFIG.N + GLOBAL_CONFIG.fake_pieces);

    // Regular pieces
    let r = 1;
    let c = 1;
    for(let l in piezas){
      let pieza = piezas[l];
      if(c === GLOBAL_CONFIG.M + 1){
        r++;
        c = 1;
      }
      puzzle.push(
        {
          "row":r,
          "column":c,
          "faceImgId":pieza.face.id,
          "reverseImgId":pieza.reverse.id,
          "faceImgPath":pieza.face.path,
          "reverseImgPath":pieza.reverse.path,
        }
      );
      c++;
    }

    // Fake pieces
    r = 1; c = 1;
    for(let p in piezasExtra){
      let pieza = piezasExtra[p];
      puzzle.push(
        {
          "row":"E" + c,
          "column":"E" + c,
          "faceImgId":pieza.face.id,
          "reverseImgId":pieza.reverse.id,
          "faceImgPath":pieza.face.path,
          "reverseImgPath":pieza.reverse.path,
        }
      );
      c++;
    }

    if(typeof puzzle[0].reverseImgPath === "string" && GLOBAL_CONFIG.reverseMode.toString() === "true"){
      // Flip pieces randomly
      for(let x = 0; x < puzzle.length; x++){
        if(Math.random() > 0.5){
          let oldPiece = Object.assign({}, puzzle[x]);
          puzzle[x].faceImgPath = oldPiece.reverseImgPath;
          puzzle[x].faceImgId = oldPiece.reverseImgId;
          puzzle[x].reverseImgPath = oldPiece.faceImgPath;
          puzzle[x].reverseImgId = oldPiece.faceImgId;
        }
      }
    }
    console.log(puzzle);
    return puzzle;
  }

  shuffle(a){
    for(let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Flip to piece
  darVuelta(row, col){
    let piezas = Object.assign([], this.props.piezas);
    for(let i = 0; i < piezas.length; i ++){
      if(piezas[i].row === row && piezas[i].column === col){
        let oldPiece = Object.assign({}, piezas[i]);
        piezas[i].faceImgPath = oldPiece.reverseImgPath;
        piezas[i].faceImgId = oldPiece.reverseImgId;
        piezas[i].reverseImgPath = oldPiece.faceImgPath;
        piezas[i].reverseImgId = oldPiece.faceImgId;
        this.props.dispatch(updatePieces(piezas));
      }

    }
  }

  // Select one of the pieces
  seleccionarPieza(row, column){
    let newSelectedPieces = this.getNewSelectedPieces(row, column);

    this.props.dispatch(selectPiece(newSelectedPieces));
    // Interchange of pieces
    if(newSelectedPieces[0][0] !== -1 && newSelectedPieces[1][0] !== -1){
      let row1, row2, col1, col2;
      row1 = newSelectedPieces[0][0];
      col1 = newSelectedPieces[0][1];
      row2 = newSelectedPieces[1][0];
      col2 = newSelectedPieces[1][1];
      let newPieces = this.interchangePieces(row1, col1, row2, col2);
      this.props.dispatch(updatePieces(newPieces));
    }

  }

  getNewSelectedPieces(row, col){
    let oldPiezasSeleccionadas = Object.assign([], this.props.piezasSeleccionadas);
    // Select the first piece
    if(oldPiezasSeleccionadas[0][0] === -1){
      oldPiezasSeleccionadas[0][0] = row;
      oldPiezasSeleccionadas[0][1] = col;
      return oldPiezasSeleccionadas;
    }
    // Select a new first piece
    if(oldPiezasSeleccionadas[0][0] !== -1 && oldPiezasSeleccionadas[1][0] !== -1){
      oldPiezasSeleccionadas[0][0] = row;
      oldPiezasSeleccionadas[0][1] = col;
      oldPiezasSeleccionadas[1][0] = -1;
      oldPiezasSeleccionadas[1][1] = -1;
      return oldPiezasSeleccionadas;
    }
    // Unselect a piece previously selected
    if(oldPiezasSeleccionadas[0][0] !== -1 && row === oldPiezasSeleccionadas[0][0] && col === oldPiezasSeleccionadas[0][1]){
      oldPiezasSeleccionadas[0][0] = -1;
      oldPiezasSeleccionadas[0][1] = -1;
      return oldPiezasSeleccionadas;
    }

    // Select a second piece
    if(oldPiezasSeleccionadas[0][0] !== -1){
      oldPiezasSeleccionadas[1][0] = row;
      oldPiezasSeleccionadas[1][1] = col;
      return oldPiezasSeleccionadas;
    }
  }

  interchangePieces(row1, col1, row2, col2){
    let ind1, ind2, piezas, img1, img2, imgFaceId1, imgFaceId2, imgRev1, imgRev2, imgReverseId1, imgReverseId2, i;
    ind1 = -1;
    ind2 = -1;

    piezas = Object.assign([], this.props.piezas);

    for(i = 0; i < piezas.length; i ++){
      if(piezas[i].row === row1 && piezas[i].column === col1){
        ind1 = i;
      }
      if(piezas[i].row === row2 && piezas[i].column === col2){
        ind2 = i;
      }
    }

    img1 = piezas[ind1].faceImgPath;
    img2 = piezas[ind2].faceImgPath;

    imgRev1 = piezas[ind1].reverseImgPath;
    imgRev2 = piezas[ind2].reverseImgPath;

    imgFaceId1 = piezas[ind1].faceImgId;
    imgFaceId2 = piezas[ind2].faceImgId;

    imgReverseId1 = piezas[ind1].reverseImgId;
    imgReverseId2 = piezas[ind2].reverseImgId;

    piezas[ind1].faceImgPath = img2;
    piezas[ind2].faceImgPath = img1;

    piezas[ind1].reverseImgPath = imgRev2;
    piezas[ind2].reverseImgPath = imgRev1;

    piezas[ind1].faceImgId = imgFaceId2;
    piezas[ind2].faceImgId = imgFaceId1;

    piezas[ind1].reverseImgId = imgReverseId2;
    piezas[ind2].reverseImgId = imgReverseId1;

    return piezas;
  }

  // Flip all the pieces
  toggle(){
    let piezas = Object.assign([], this.props.piezas);
    for(let i = 0; i < piezas.length; i ++){
      let oldPiece = Object.assign({}, piezas[i]);
      piezas[i].faceImgPath = oldPiece.reverseImgPath;
      piezas[i].faceImgId = oldPiece.reverseImgId;
      piezas[i].reverseImgPath = oldPiece.faceImgPath;
      piezas[i].reverseImgId = oldPiece.faceImgId;
    }
    this.props.dispatch(updatePieces(piezas));
  }

  // Show final message
  mostrarMsgFinal(){
    this.setState({mostrarMsgFinal:true});
  }

  // Hide final message
  ocultarMsgFinal(){
    this.setState({mostrarMsgFinal:false});
  }

  // Check the solution
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

      this.props.dispatch(checkSolution(success));
      if(success){
        let message = res.msg;
        if((typeof message === "string") && (message.trim() != "")){
          GLOBAL_CONFIG.endMessageSuccess = message;
        }
      }
      this.mostrarMsgFinal();
    }.bind(this));

  }

  // Show instructions
  mostrarInstrucciones(){
    this.setState({mostrarMsgInicial:true, temporizador:false});
  }

  // Hide instructions
  ocultarInstrucciones(){
    this.setState({mostrarMsgInicial:false});
    this.setState({playing_music:true});
  }

  // Start the countdown timer
  onStartTime(){
    this.setState({onStartTime:true});
  }

  // Toggle the zoom option
  lupa(){
    let value = this.state.lupa;
    this.setState({lupa:!value});
  }

  // Zoomed piece parameters
  zoomImage(img, width, height, isExtraPiece){
    this.setState({showZoom:true, zoomImgPath:img, widthPiece:width, heightPiece:height, isExtraPiece:isExtraPiece});
  }

  // Zoom configuration not active
  zoomOff(){
    this.setState({showZoom:false});
  }
}

function mapStateToProps(state){
  return state;
}
export default connect(mapStateToProps)(App);