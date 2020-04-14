import React from "react";
import '../assets/scss/main.scss';
import {Fragment} from "react";
import Piece from './Piece';

export default class Puzzle extends React.Component {
  constructor(props){
    super(props);
  }
  render(){

    let puzzle = "";
    let style_table = "";
    let title ="Área de puzzle";

    if(this.props.puzzleType === "reverse-print"){
        title="Área de puzzle (Reverso)";
    }

    if(this.props.puzzleType === "regular"){
      style_table = "tablePuzzle";
    }
    else{
        style_table = "tablePrint";
      }


    let o = -1;
    let rows = []; // rows=[1,2,3,4,5,...,N]
    for(let i = 1; i <= this.props.conf.N; i++){
      rows.push(i);
    }
    let columns = []; // rows=[1,2,3,4,5,...,M]
    for(let i = 1; i <= this.props.conf.M; i++){
      columns.push(i);
    }
    puzzle = (
      <Fragment>
        <h2 className={"msgPrint"}>{title}</h2>
        <table className={style_table}>
          <tbody>
            {rows.map((row, ind) => {
              return (
                <tr key={ind}>
                  {columns.map((col, indC) => {
                    o++;
                    return (
                      <Fragment key={indC}>
                        <td>
                          <Piece
                            row={this.props.piezas[o].row}
                            column={this.props.piezas[o].column}
                            conf={this.props.conf}
                            seleccionarPieza={this.props.seleccionarPieza}
                            lupa = {this.props.lupa}
                            zoomImage={this.props.zoomImage}
                            piezasSeleccionadas={this.props.piezasSeleccionadas}
                            darVuelta = {this.props.darVuelta}
                            imagen = {this.props.puzzleType === "reverse-print"?this.props.piezas[o].reverseImgPath : this.props.piezas[o].faceImgPath}
                            imagenRev = {this.props.piezas[o].reverseImgPath}

                          />
                        </td>
                      </Fragment>);
                  })}
                </tr>);
            })}
          </tbody>
        </table>
        <div className="pagebreak"></div>

      </Fragment>
    );

    return (
      <>
        {puzzle}
      </>

    );
  }

}