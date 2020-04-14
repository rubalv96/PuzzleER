import React from "react";
import '../assets/scss/main.scss';
import {Fragment} from "react";
import Piece from './Piece';

export default class PuzzleFake extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let fakeArea = "";
    let piezasAreaExtra = [];
    this.props.piezas.forEach(pieza => {
      if(this.props.piezas.indexOf(pieza) > (this.props.conf.N * this.props.conf.M - 1)){
        piezasAreaExtra.push(pieza);
      }
    });

    let title = "Área de piezas extra";
    if(this.props.puzzleFakeType === "reverse-print"){
      title = "Área de piezas extra (Reverso)";
    }

    (this.props.conf.fake_pieces > 0) ? fakeArea = (
      <>

        <h2 className="msgPrint">{title}</h2>
        <div className={this.props.puzzleFakeType === "regular" ? "fakeAreaContainer" : "fakeAreaPrint"} >
          {piezasAreaExtra.map((pieza, ind)=>{
            return (
              <Fragment key={ind}>
                <div className={this.props.puzzleFakeType === "regular" ? "extraPiece" : "piecePrint"}>
                  <Piece key={ind}
                    row={pieza.row}
                    column={pieza.column}
                    conf={this.props.conf}
                    seleccionarPieza={this.props.seleccionarPieza}
                    piezasSeleccionadas={this.props.piezasSeleccionadas}
                    darVuelta = {this.props.darVuelta}
                    imagen = {this.props.puzzleFakeType === "reverse-print" ? pieza.reverseImgPath : pieza.faceImgPath}
                    imagenRev = {pieza.reverseImgPath}
                    zoomImage={this.props.zoomImage}
                    lupa={this.props.lupa}
                    extraArea
                    print={this.props.puzzleFakeType !== "regular"}
                  />

                </div>

              </Fragment>
            );
          })}

        </div>
        <div className="pagebreak"/>

      </>
    ) : fakeArea = "";

    return (
      <>
        {fakeArea}
      </>

    );
  }

}