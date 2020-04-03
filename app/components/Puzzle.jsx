import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";
import '../assets/scss/main.scss';
import * as Utils from '../vendors/Utils';
import {addObjectives} from "../reducers/actions";
let GLOBAL_CONFIG = require('../config/config.js');

export default class Puzzle extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let objectives = [];
    objectives.push(new Utils.Objective({id:(1), progress_measure:(1), score:(1)}));
    this.props.dispatch(addObjectives(objectives));
  }
  render(){
    let rows = []; // rows=[1,2,3,4,5,...,N]
    for(let i = 1; i <= this.props.conf.N; i++){
      rows.push(i);
    }
    let columns = []; // rows=[1,2,3,4,5,...,M]
    for(let i = 1; i <= this.props.conf.M; i++){
      columns.push(i);
    }

    let l = -1, m = -1, o = -1;

    let areaPuzzle = (
      <Fragment>
        <h2 className="msgPrint">Área de puzzle</h2>
        <table className={"tablePuzzle"}>
          <tbody>
            {rows.map((row, ind) => {
              return (
                <tr key={ind}>
                  {columns.map((col, indC) => {
                    l++;
                    return (
                      <Fragment key={ind + "" + indC}>
                        <td>
                          <Piece
                            key={ind + "" + indC}
                            row={this.props.piezas[l].row}
                            column={this.props.piezas[l].column}
                            conf={this.props.conf}
                            seleccionarPieza={this.props.seleccionarPieza}
                            piezasSeleccionadas={this.props.piezasSeleccionadas}
                            darVuelta = {this.props.darVuelta}
                            imagen = {this.props.piezas[l].faceImgPath}
                            imagenRev = {this.props.piezas[l].reverseImgPath}
                            lupa={this.props.lupa}
                            zoomImage={this.props.zoomImage}
                          />
                        </td>
                      </Fragment>);
                  })}
                </tr>);
            })}
          </tbody>
        </table>
      </Fragment>
    );

    let fakeArea = "";
    let piezasAreaExtra = [];
    this.props.piezas.forEach(pieza => {
      if(this.props.piezas.indexOf(pieza) > (GLOBAL_CONFIG.N * GLOBAL_CONFIG.M - 1)){
        piezasAreaExtra.push(pieza);
      }
    });

    let style = {display:'flex',
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      alignContent:"center",
      flexWrap:"wrap",
      width:"35vw",
      height:"28vw",
      marginBottom:"300px",
      marginRight:"auto",
      marginLeft:"auto",
    };

    (GLOBAL_CONFIG.fake_pieces > 0) ? fakeArea = (
      <div id="contenedorExtra" style={style}>
        {piezasAreaExtra.map((pieza, ind)=>{
          return (
            <Fragment key={ind}>
              <div style={{margin:"0.15vw", width:"auto"}} className="extraPiece">
                <Piece key={ind}
                  row={pieza.row}
                  column={pieza.column}
                  conf={this.props.conf}
                  seleccionarPieza={this.props.seleccionarPieza}
                  piezasSeleccionadas={this.props.piezasSeleccionadas}
                  darVuelta = {this.props.darVuelta}
                  imagen = {pieza.faceImgPath}
                  imagenRev = {pieza.reverseImgPath}
                  zoomImage={this.props.zoomImage}
                  lupa={this.props.lupa}
                  extraArea
                />
              </div>
            </Fragment>
          );
        })}
      </div>
    ) : fakeArea = "";

    let printStyle = {
      display:'flex',
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      alignContent:"center",
      flexWrap:"wrap",
      width:"80%",
      height:"80%",
      marginRight:"auto",
      marginLeft:"auto",
      border:"5px dashed green",
    };

    let fakeAreaPrint = "";
    (GLOBAL_CONFIG.reverseMode === true) ? fakeAreaPrint = (
      <div className="contenedorExtra" style={printStyle}>
        {piezasAreaExtra.map((pieza, ind)=>{
          return (
            <Fragment key={ind}>
              <div style={{margin:"10px", width:"auto", padding:"5px", border:"2px dashed green"}} className="extraPiece">
                <Piece key={ind}
                  row={pieza.row}
                  column={pieza.column}
                  conf={this.props.conf}
                  seleccionarPieza={this.props.seleccionarPieza}
                  piezasSeleccionadas={this.props.piezasSeleccionadas}
                  darVuelta = {this.props.darVuelta}
                  imagen = {pieza.faceImgPath}
                  imagenRev = {pieza.reverseImgPath}
                  zoomImage={this.props.zoomImage}
                  lupa={this.props.lupa}
                  extraArea
                  print
                />
              </div>
            </Fragment>
          );
        })}
      </div>
    ) : fakeAreaPrint = "";

    let fakeReverseAreaPrint = "";
    fakeReverseAreaPrint = (
      <div className="contenedorExtra" style={printStyle}>
        {piezasAreaExtra.map((pieza, ind)=>{
          return (
            <Fragment key={ind}>
              <div style={{margin:"10px", width:"auto", padding:"5px", border:"2px dashed green"}} className="extraPiece">
                <Piece key={ind}
                  row={pieza.row}
                  column={pieza.column}
                  conf={this.props.conf}
                  seleccionarPieza={this.props.seleccionarPieza}
                  piezasSeleccionadas={this.props.piezasSeleccionadas}
                  darVuelta = {this.props.darVuelta}
                  imagen = {pieza.reverseImgPath}
                  imagenRev = {pieza.faceImgPath}
                  zoomImage={this.props.zoomImage}
                  lupa={this.props.lupa}
                  extraArea
                  print
                />
              </div>
            </Fragment>
          );
        })}
      </div>
    );

    let areaPuzzlePrint;
    areaPuzzlePrint = (
      <Fragment>
        <h2 className="msgPrint">Área de puzzle</h2>
        <table className={"tablePrint"}>
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
                            piezasSeleccionadas={this.props.piezasSeleccionadas}
                            darVuelta = {this.props.darVuelta}
                            imagen = {this.props.piezas[o].faceImgPath}
                            imagenRev = {this.props.piezas[o].reverseImgPath}

                          />
                        </td>
                      </Fragment>);
                  })}
                </tr>);
            })}
          </tbody>
        </table>
      </Fragment>
    );

    let areaPuzzleExtraPrint;
    if(GLOBAL_CONFIG.fake_pieces > 0){
      areaPuzzleExtraPrint =
        (
          <Fragment>
            <div className="pagebreak" />
            <h2 className="msgPrint">Área de piezas extra</h2>
            {fakeAreaPrint}
          </Fragment>
        );
    }

    let areaPuzzlePrintReverso = "";
    if(this.props.conf.reverseMode){
      areaPuzzlePrintReverso = (
        <Fragment>
          <div className="pagebreak" />
          <h1 className="title titlePrint">{this.props.conf.title}</h1>
          <h2 className="msgPrint">Área de puzzle (reverso)</h2>
          <table className="tablePrint">
            <tbody>
              {rows.map((row, ind) => {
                return (
                  <tr key={ind}>
                    {columns.map((col, indC) => {
                      m++;
                      let numP1;
                      this.props.piezas[m].numPuzzle === 1 ? numP1 = 2 : numP1 = 1;
                      return (
                        <Fragment key={indC}>
                          <td>
                            <Piece row={this.props.piezas[m].row}
                              column={this.props.piezas[m].column}
                              conf={this.props.conf}
                              seleccionarPieza={this.props.seleccionarPieza}
                              piezasSeleccionadas={this.props.piezasSeleccionadas}
                              darVuelta = {this.props.darVuelta}
                              imagen = {this.props.piezas[m].reverseImgPath}
                            />
                          </td>
                        </Fragment>);
                    })}
                  </tr>);
              })}
            </tbody>
          </table>
        </Fragment>
      );
    }
    let areaPuzzleExtraPrintReverso = "";
    if(GLOBAL_CONFIG.fake_pieces > 0){
      areaPuzzleExtraPrintReverso = (
        <Fragment>
          <div className="pagebreak" />
          <h2 className="msgPrint">Área de piezas extra (reverso)</h2>
          {fakeReverseAreaPrint}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className={"puzzleArea"} style={{display:"flex", alignItems:"center", justifyContent:"center", maxWidth:"100%", marginTop:"2vw"}}>
          {/* Componente de área de juego del puzzle*/}
          {areaPuzzle}
          {/* Componente de área de piezas extra*/}
          {fakeArea}
        </div>
        {/* Componentes visibles solo en versión de impresión en papel*/}
        {areaPuzzlePrint}
        {areaPuzzleExtraPrint}
        {areaPuzzlePrintReverso}
        {areaPuzzleExtraPrintReverso}
      </Fragment>
    );
  }
}