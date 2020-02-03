import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";
import '../assets/scss/main.scss';
import * as Utils from '../vendors/Utils';
import {addObjectives} from "../reducers/actions";

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

    return (

      <Fragment>
        <table cellSpacing={0} cellPadding={0} style={{clear:"both", border:"3px purple solid", borderRadius:"3px", borderCollapse:"collapse", margin:"auto"}}>
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

        {/* <img src={this.props.conf.image} className="imagenCompleta" alt="Imagen del puzzle completada"/>*/}
        <table cellSpacing={0} cellPadding={0} style={{clear:"both", border:"3px purple solid", borderRadius:"3px", borderCollapse:"collapse", margin:"auto"}}>
          {rowsE.map((row, ind) => {
            return (
              <tr key={ind}>
                {columnsE.map((col, indC) => {
                  k++;
                  console.log("k: " + k);
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

      </Fragment>
    );
  }
  componentDidMount(){
    let objectives = [];
    objectives.push(new Utils.Objective({id:(1), progress_measure:(1/1), score:(1/1), completion: (true), success:(true)}));
    this.props.dispatch(addObjectives(objectives));
  }
}