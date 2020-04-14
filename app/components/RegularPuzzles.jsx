import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";
import '../assets/scss/main.scss';
import * as Utils from '../vendors/Utils';
import {addObjectives} from "../reducers/actions";
let GLOBAL_CONFIG = require('../config/config.js');
import Puzzle from './Puzzle';
import PuzzleFake from './PuzzleFake';

export default class RegularPuzzles extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    
    return (
      <Fragment>

<div className={"puzzleArea"}>
          {/* Componente de área de juego del puzzle*/}

          <Puzzle
            piezasSeleccionadas={this.props.piezasSeleccionadas}
            piezas={this.props.piezas}
            conf={this.props.conf}
            seleccionarPieza={this.props.seleccionarPieza}
            darVuelta = {this.props.darVuelta}
            toggle = {this.props.toggle}
            lupa = {this.props.lupa}
            comprobarCompletado={this.props.comprobarCompletado}
            dispatch={this.props.dispatch}
            zoomImage={this.props.zoomImage}
            puzzleType={"regular"}
          />
          {/* Componente de área de piezas extra*/}
          <PuzzleFake
            piezasSeleccionadas={this.props.piezasSeleccionadas}
            piezas={this.props.piezas}
            conf={this.props.conf}
            seleccionarPieza={this.props.seleccionarPieza}
            darVuelta = {this.props.darVuelta}
            toggle = {this.props.toggle}
            comprobarCompletado={this.props.comprobarCompletado}
            dispatch={this.props.dispatch}
            lupa = {this.props.lupa}
            zoomImage={this.props.zoomImage}
            puzzleFakeType="regular"
          />
        </div>
      </Fragment>
    );
  }
}