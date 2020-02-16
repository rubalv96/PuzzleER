import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";
import '../assets/scss/main.scss';
import * as Utils from '../vendors/Utils';
import {addObjectives} from "../reducers/actions";
import {Button} from "react-bootstrap";

export default class Puzzle extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let rows = []; // rows=[1,2,3,4,5,...,N]
    for(let i = 1; i <= this.props.conf.N; i++){
      rows.push(i);
    }
    let columns = []; // rows=[1,2,3,4,5,...,N]
    for(let i = 1; i <= this.props.conf.M; i++){
      columns.push(i);
    }

    let rowsE = []; // rows=[1,2,3,4,5,...,N]
    for(let i = 1; i <= this.props.conf.Nextra; i++){
      rowsE.push(i);
    }
    let columnsE = []; // rows=[1,2,3,4,5,...,N]
    for(let i = 1; i <= this.props.conf.Mextra; i++){
      columnsE.push(i);
    }

    let l = -1;
    let k = -1;
    let m = -1;
    let n = -1;

    return (

      <Fragment>
        <h2 className="msgPrint">Área de puzzle</h2>
        <table className={"tablePuzzle"}>
          {rows.map((row, ind) => {
            return (
              <tr key={ind}>
                {columns.map((col, indC) => {
                  l++;
                  return (
                    <Fragment key={indC}>
                      <td>

                        <Piece posRow={this.props.piezas[l].posRow}
                          posCol={this.props.piezas[l].posCol}
                          row={this.props.piezas[l].row}
                          column={this.props.piezas[l].column}
                          conf={this.props.conf}
                          seleccionarPieza={this.props.seleccionarPieza}
                          piezasSeleccionadas={this.props.piezasSeleccionadas}
                          numPuzzle={this.props.piezas[l].numPuzzle}
                          darVuelta = {this.props.darVuelta}
                          piezaExtra = {this.props.piezas[l].piezaExtra}

                        />
                      </td>
                    </Fragment>);
                })}

              </tr>);
          })}

        </table>

        <div className="cont">
          <label className="switch" >
            <input type="checkbox" onClick={this.props.toggle}/>
            <span className="slider round" />
          </label>
        </div>

        <div className="btnComprobar">
          <Button onClick={this.props.comprobarCompletado}> Comprobar </Button>
        </div>

        <h2 className="msgPrint">Área de piezas extra</h2>
        <table className={"tablePuzzle"}>
          {rowsE.map((row, ind) => {
            return (
              <tr key={ind}>
                {columnsE.map((col, indC) => {
                  k++;
                  return (
                    <Fragment key={indC}>
                      <td>

                        <Piece posRow={this.props.piezas[k + this.props.conf.N * this.props.conf.M].posRow}
                          posCol={this.props.piezas[k + this.props.conf.N * this.props.conf.M].posCol}
                          row={this.props.piezas[k + this.props.conf.N * this.props.conf.M].row}
                          column={this.props.piezas[k + this.props.conf.N * this.props.conf.M].column}
                          conf={this.props.conf}
                          seleccionarPieza={this.props.seleccionarPieza}
                          piezasSeleccionadas={this.props.piezasSeleccionadas}
                          numPuzzle={this.props.piezas[k + this.props.conf.N * this.props.conf.M].numPuzzle}
                          darVuelta = {this.props.darVuelta}
                          piezaExtra = {this.props.piezas[k + this.props.conf.N * this.props.conf.M].piezaExtra}

                        />
                      </td>
                    </Fragment>);
                })}

              </tr>);
          })}
        </table>
          <div className="pagebreak"></div>
          <h1 className="title titlePrint">Generador de Puzzles</h1>
          <h2 className="msgPrint">Área de puzzle</h2>
          <table className="tablePuzzle tablePrint">
              {rows.map((row, ind) => {
                  return (
                      <tr key={ind}>
                          {columns.map((col, indC) => {
                              m++;
                              let numP1;
                              this.props.piezas[m].numPuzzle === "1" ? numP1="2" : numP1="1";
                              return (
                                  <Fragment key={indC}>
                                      <td>

                                          <Piece posRow={this.props.piezas[m].posRow}
                                                 posCol={this.props.piezas[m].posCol}
                                                 row={this.props.piezas[m].row}
                                                 column={this.props.piezas[m].column}
                                                 conf={this.props.conf}
                                                 seleccionarPieza={this.props.seleccionarPieza}
                                                 piezasSeleccionadas={this.props.piezasSeleccionadas}
                                                 numPuzzle={numP1}
                                                 darVuelta = {this.props.darVuelta}
                                                 piezaExtra = {this.props.piezas[m].piezaExtra}

                                          />
                                      </td>
                                  </Fragment>);
                          })}

                      </tr>);
              })}

          </table>

          <div className="cont print">
              <label className="switch" >
                  <input type="checkbox" onClick={this.props.toggle}/>
                  <span className="slider round" />
              </label>
          </div>

          <div className="btnComprobar print">
              <Button onClick={this.props.comprobarCompletado}> Comprobar </Button>
          </div>

          <h2 className="msgPrint">Área de piezas extra</h2>
          <table className={"tablePuzzle tablePrint"}>
              {rowsE.map((row, ind) => {
                  return (
                      <tr key={ind}>
                          {columnsE.map((col, indC) => {
                              n++;
                              let numP2;
                              this.props.piezas[n + this.props.conf.N * this.props.conf.M].numPuzzle === "1" ? numP2="2" : numP2="1";
                              return (
                                  <Fragment key={indC}>
                                      <td>

                                          <Piece posRow={this.props.piezas[n + this.props.conf.N * this.props.conf.M].posRow}
                                                 posCol={this.props.piezas[n + this.props.conf.N * this.props.conf.M].posCol}
                                                 row={this.props.piezas[n + this.props.conf.N * this.props.conf.M].row}
                                                 column={this.props.piezas[n + this.props.conf.N * this.props.conf.M].column}
                                                 conf={this.props.conf}
                                                 seleccionarPieza={this.props.seleccionarPieza}
                                                 piezasSeleccionadas={this.props.piezasSeleccionadas}
                                                 numPuzzle={numP2}
                                                 darVuelta = {this.props.darVuelta}
                                                 piezaExtra = {this.props.piezas[n + this.props.conf.N * this.props.conf.M].piezaExtra}

                                          />
                                      </td>
                                  </Fragment>);
                          })}

                      </tr>);
              })}
          </table>
      </Fragment>
    );
  }
  componentDidMount(){
    let objectives = [];
    objectives.push(new Utils.Objective({id:(1), progress_measure:(1), score:(1)}));
    this.props.dispatch(addObjectives(objectives));
  }
}