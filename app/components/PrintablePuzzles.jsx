import React from 'react';
import {Fragment} from 'react';
import '../assets/scss/main.scss';
import Puzzle from './Puzzle';
import PuzzleFake from './PuzzleFake';

export default class PrintablePuzzles extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let puzzles = [];
    let fakePuzzles = [];
    if(this.props.conf.reverseMode){
      puzzles.push("regular-print");
      puzzles.push("reverse-print");
    }
    if(this.props.conf.fake_pieces > 0){
      if(this.props.conf.reverseMode){
        fakePuzzles.push("regular-print");
        fakePuzzles.push("reverse-print");
      }
    }

    return (
      <Fragment>

        {/* Componentes visibles solo en versión de impresión en papel*/}
        {puzzles.map((puzzleType, ind)=>{
          console.log(puzzleType);
          return (
            <Puzzle
              key={ind}
              piezasSeleccionadas={this.props.piezasSeleccionadas}
              piezas={this.props.piezas}
              conf={this.props.conf}
              seleccionarPieza={this.props.seleccionarPieza}
              darVuelta = {this.props.darVuelta}
              toggle = {this.props.toggle}
              comprobarCompletado={this.props.comprobarCompletado}
              dispatch={this.props.dispatch}
              zoomImage={this.props.zoomImage}
              puzzleType={puzzleType}
            />
          );
        })}

        {fakePuzzles.map((puzzleType, ind)=>{
          console.log(puzzleType);
          return (
            <PuzzleFake
              key={ind}
              piezasSeleccionadas={this.props.piezasSeleccionadas}
              piezas={this.props.piezas}
              conf={this.props.conf}
              seleccionarPieza={this.props.seleccionarPieza}
              darVuelta = {this.props.darVuelta}
              toggle = {this.props.toggle}
              comprobarCompletado={this.props.comprobarCompletado}
              dispatch={this.props.dispatch}
              zoomImage={this.props.zoomImage}
              puzzleFakeType={puzzleType}
            />
          );
        })}

        {/* <Puzzle
          piezasSeleccionadas={this.props.piezasSeleccionadas}
          piezas={this.props.piezas}
          conf={this.props.conf}
          seleccionarPieza={this.props.seleccionarPieza}
          darVuelta = {this.props.darVuelta}
          toggle = {this.props.toggle}
          comprobarCompletado={this.props.comprobarCompletado}
          dispatch={this.props.dispatch}
          zoomImage={this.props.zoomImage}
          puzzleType={"regular-print"}
        />

        <Puzzle
          piezasSeleccionadas={this.props.piezasSeleccionadas}
          piezas={this.props.piezas}
          conf={this.props.conf}
          seleccionarPieza={this.props.seleccionarPieza}
          darVuelta = {this.props.darVuelta}
          toggle = {this.props.toggle}
          comprobarCompletado={this.props.comprobarCompletado}
          dispatch={this.props.dispatch}
          zoomImage={this.props.zoomImage}
          puzzleType={"reverse-print"}
        /> */}

        {/* <PuzzleFake
          piezasSeleccionadas={this.props.piezasSeleccionadas}
          piezas={this.props.piezas}
          conf={this.props.conf}
          seleccionarPieza={this.props.seleccionarPieza}
          darVuelta = {this.props.darVuelta}
          toggle = {this.props.toggle}
          comprobarCompletado={this.props.comprobarCompletado}
          dispatch={this.props.dispatch}
          zoomImage={this.props.zoomImage}
          puzzleFakeType="regular-print"
        />
        <PuzzleFake
          piezasSeleccionadas={this.props.piezasSeleccionadas}
          piezas={this.props.piezas}
          conf={this.props.conf}
          seleccionarPieza={this.props.seleccionarPieza}
          darVuelta = {this.props.darVuelta}
          toggle = {this.props.toggle}
          comprobarCompletado={this.props.comprobarCompletado}
          dispatch={this.props.dispatch}
          zoomImage={this.props.zoomImage}
          puzzleFakeType="reverse-print"
        /> */}

      </Fragment>
    );
  }
}