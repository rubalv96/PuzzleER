import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";
import '../assets/scss/main.scss';
import * as Utils from '../vendors/Utils';
import {addObjectives} from "../reducers/actions";
let GLOBAL_CONFIG = require('../config/config.js');
import Puzzle from './Puzzle';
import PuzzleFake from './PuzzleFake';
import PrintablePuzzles from './PrintablePuzzles';
import RegularPuzzles from './RegularPuzzles';

export default class PuzzlesGroup extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let objectives = [];
    objectives.push(new Utils.Objective({id:(1), progress_measure:(1), score:(1)}));
    this.props.dispatch(addObjectives(objectives));
  }
  render(){
   

    return (
      <Fragment>

        <RegularPuzzles 
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
        />
        <PrintablePuzzles
          piezasSeleccionadas={this.props.piezasSeleccionadas}
          piezas={this.props.piezas}
          conf={this.props.conf}
          seleccionarPieza={this.props.seleccionarPieza}
          darVuelta = {this.props.darVuelta}
          toggle = {this.props.toggle}
          comprobarCompletado={this.props.comprobarCompletado}
          dispatch={this.props.dispatch}
          zoomImage={this.props.zoomImage}
        />

      </Fragment>
    );
  }
}