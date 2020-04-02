import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";
import '../assets/scss/main.scss';
import * as Utils from '../vendors/Utils';
import {addObjectives} from "../reducers/actions";
import {Tooltip} from "react-bootstrap";
let GLOBAL_CONFIG = require('../config/config.js');

export default class Puzzle extends React.Component {

  constructor(props){
    super(props);
    this.mostrarTooltip = this.mostrarTooltip.bind(this);
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

    let rowsE = []; // rows=[1,2,3,4,5,...,Nextra]
    for(let i = 1; i <= this.props.conf.Nextra; i++){
      rowsE.push(i);
    }
    let columnsE = []; // rows=[1,2,3,4,5,...,Mextra]
    for(let i = 1; i <= this.props.conf.Mextra; i++){
      columnsE.push(i);
    }

    let l = -1, k = -1, m = -1, n = -1, o = -1, p = -1;

    let areaPuzzle;
    areaPuzzle =
                    (<>
                      <h2 className="msgPrint">Área de puzzle</h2>
                      <table className={"tablePuzzle"}>
                        <tbody>
                          {rows.map((row, ind) => {
                            return (
                              <tr key={ind}>
                                {columns.map((col, indC) => {
                                  l++;
                                  return (
                                    <Fragment key={indC}>

                                      <td>
                                        <Piece
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
                    </>);
    let areaPiezasExtra = "";
    if((GLOBAL_CONFIG.Nextra > 0 && GLOBAL_CONFIG.Mextra > 0)){
      areaPiezasExtra = (
        <>
          <h2 className="msgPrint">Área de piezas extra</h2>
          <table className={"tablePuzzle extra"}>
            <tbody>
              {rowsE.map((row, ind) => {
                return (
                  <tr key={ind}>
                    {columnsE.map((col, indC) => {
                      k++;
                      return (
                        <Fragment key={indC}>
                          <td>
                            <Piece row={this.props.piezas[k + this.props.conf.N * this.props.conf.M].row}
                              column={this.props.piezas[k + this.props.conf.N * this.props.conf.M].column}
                              conf={this.props.conf}
                              seleccionarPieza={this.props.seleccionarPieza}
                              piezasSeleccionadas={this.props.piezasSeleccionadas}
                              darVuelta = {this.props.darVuelta}
                              imagen = {this.props.piezas[k + this.props.conf.N * this.props.conf.M].faceImgPath}
                              imagenRev = {this.props.piezas[k + this.props.conf.N * this.props.conf.M].reverseImgPath}
                              zoomImage={this.props.zoomImage}
                              lupa={this.props.lupa}
                              extraArea
                            />
                          </td>
                        </Fragment>);
                    })}
                  </tr>);
              })}
            </tbody>
          </table>
        </>
      );
    }

    let fakeArea="";
    let piezasAreaExtra=[];
    this.props.piezas.forEach(pieza => {
      if(this.props.piezas.indexOf(pieza)> (GLOBAL_CONFIG.N*GLOBAL_CONFIG.M -1)){
        piezasAreaExtra.push(pieza);
      }
    });


    console.log("Piezas Area Extra:" + JSON.stringify(piezasAreaExtra));





    let style={display:'flex',
                flexDirection:"column",
                justifyItems:"flex-start",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                width: "35vw",
                height: "28vw",
                // height: "46vh",
                backgroundColor:"",
                marginBottom:"300px",
                marginRight: "auto",
                marginLeft: "auto",
              };
    fakeArea=(
      <div id="contenedorExtra"  style={style}>
        {piezasAreaExtra.map((pieza,ind)=>{

            return(

              <>
              <div style={{margin:"auto"}} className="extraPiece">
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

              </>
            );
        })}
      </div>
    )
    let areaPuzzlePrint;
    areaPuzzlePrint =
                    (
                      <>
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
                      </>
                    );
    let areaPuzzleExtraPrint;
    if(this.props.conf.Nextra > 0 && this.props.conf.Mextra > 0){
      areaPuzzleExtraPrint =
        (
          <>
            <h2 className="msgPrint">Área de piezas extra</h2>
            <table className={"tablePrint"}>
              <tbody>
                {rowsE.map((row, ind) => {
                  return (
                    <tr key={ind}>
                      {columnsE.map((col, indC) => {
                        p++;
                        return (
                          <Fragment key={indC}>
                            <td>
                              <Piece row={this.props.piezas[p + this.props.conf.N * this.props.conf.M].row}
                                column={this.props.piezas[p + this.props.conf.N * this.props.conf.M].column}
                                conf={this.props.conf}
                                seleccionarPieza={this.props.seleccionarPieza}
                                piezasSeleccionadas={this.props.piezasSeleccionadas}
                                darVuelta = {this.props.darVuelta}
                                imagen = {this.props.piezas[p + this.props.conf.N * this.props.conf.M].faceImgPath}
                                imagenRev = {this.props.piezas[p + this.props.conf.N * this.props.conf.M].reverseImgPath}
                              />
                            </td>
                          </Fragment>);
                      })}
                    </tr>);
                })}
              </tbody>
            </table>
          </>
        );
    }

    let areaPuzzlePrintReverso = "";
    if(this.props.conf.reverseMode){
      areaPuzzlePrintReverso = (
        <>
          <div className="pagebreak" />
          <h1 className="title titlePrint">{this.props.conf.title}</h1>
          <h2 className="msgPrint">Área de puzzle</h2>
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
        </>
      );
    }
    let areaPuzzleExtraPrintReverso = "";
    if(this.props.conf.Nextra > 0 && this.props.conf.reverseMode){
      areaPuzzleExtraPrintReverso = (
        <>
          <h2 className="msgPrint">Área de piezas extra</h2>
          <table className={"tablePrint"}>
            <tbody>
              {rowsE.map((row, ind) => {
                return (
                  <tr key={ind}>
                    {columnsE.map((col, indC) => {
                      n++;
                      let numP2;
                      this.props.piezas[n + this.props.conf.N * this.props.conf.M].numPuzzle === 1 ? numP2 = 2 : numP2 = 1;
                      return (
                        <Fragment key={indC}>
                          <td>
                            <Piece row={this.props.piezas[n + this.props.conf.N * this.props.conf.M].row}
                              column={this.props.piezas[n + this.props.conf.N * this.props.conf.M].column}
                              conf={this.props.conf}
                              seleccionarPieza={this.props.seleccionarPieza}
                              piezasSeleccionadas={this.props.piezasSeleccionadas}
                              darVuelta = {this.props.darVuelta}
                              imagen = {this.props.piezas[n + this.props.conf.N * this.props.conf.M].reverseImgPath}

                            />
                          </td>
                        </Fragment>);
                    })}
                  </tr>);
              })}
            </tbody>
          </table>
        </>
      );
    }
    return (
      <>

        <div className={"puzzleArea"} style={{display:"flex", alignItems:"center", justifyContent:"center", maxWidth:"100%", marginTop:"2vw"}}>
          {/* Componente de área de juego del puzzle*/}
          {areaPuzzle}
          {/* Componente de área de piezas extra*/}
          {/* {areaPiezasExtra} */}
          {fakeArea}

        </div>
        {/* Componentes visibles solo en versión de impresión en papel*/}
        {areaPuzzlePrint}
        {areaPuzzleExtraPrint}
        {areaPuzzlePrintReverso}
        {areaPuzzleExtraPrintReverso}

      </>
    );
  }
  mostrarTooltip(imagen, factorZoom){
    let anchoImg = 700;
    let altoImg = 430;
    let anchoPieza = 700 / GLOBAL_CONFIG.M;
    let altoPieza = 430 / GLOBAL_CONFIG.N;

    let anchoPiezaZoom = anchoPieza * factorZoom;
    let altoPiezaZoom = altoPieza * factorZoom;

    let width = anchoPiezaZoom.toString() + "px";
    let height = altoPiezaZoom.toString() + "px";

    return <Tooltip ><img src={imagen} style={{width:width, height:height}}/></Tooltip>;

  }
  componentDidMount(){
    let objectives = [];
    objectives.push(new Utils.Objective({id:(1), progress_measure:(1), score:(1)}));
    this.props.dispatch(addObjectives(objectives));
  }
}