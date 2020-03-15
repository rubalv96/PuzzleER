import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";
import '../assets/scss/main.scss';
import * as Utils from '../vendors/Utils';
import {addObjectives, cargarImagenes} from "../reducers/actions";
import Toolkit from "./Toolkit";
import Cropper from "react-cropper";
import {GLOBAL_CONFIG} from "../config/config";
const imagenes = [], imagenesRev = [], imagenesExtra = [], imagenesExtraRev = [];
let ancho = (1280/GLOBAL_CONFIG.M);
let alto = (720/GLOBAL_CONFIG.N);

export default class Puzzle extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data:{
        'x':0,
        'y':0,
        'width':320,
        'height':360,
      },
      src:this.props.conf.image1,
      lock1:false,
      lock2:false,
      lock3:false,
      lock4:false,
    };
    this.motor = this.motor.bind(this);
    setTimeout(()=>{this.motor();}, 1000);
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

    let l = -1, k = -1, m = -1, n = -1, o = -1, p = -1;

    let areaPuzzle = "";
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

                            <Piece posRow={this.props.piezas[l].posRow}
                              posCol={this.props.piezas[l].posCol}
                              row={this.props.piezas[l].row}
                              column={this.props.piezas[l].column}
                              conf={this.props.conf}
                              seleccionarPieza={this.props.seleccionarPieza}
                              piezasSeleccionadas={this.props.piezasSeleccionadas}
                              numPuzzle={this.props.piezas[l].numPuzzle}
                              darVuelta = {this.props.darVuelta}
                              imagen = {this.props.piezas[l].imgSol}
                              imagenRev = {this.props.piezas[l].imgRev}
                              imagenExtra = {this.props.piezas[l].imgExtra}
                              imagenExtraRev = {this.props.piezas[l].imgExtraRev}

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
    if(this.props.conf.imageExtra1 !== ""){
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

                            <Piece posRow={this.props.piezas[k +this.props.conf.N * this.props.conf.M].posRow}
                                   posCol={this.props.piezas[k+  this.props.conf.N * this.props.conf.M].posCol}
                                   row={this.props.piezas[k + this.props.conf.N * this.props.conf.M].row}
                                   column={this.props.piezas[k+  this.props.conf.N * this.props.conf.M].column}
                                   conf={this.props.conf}
                                   seleccionarPieza={this.props.seleccionarPieza}
                                   piezasSeleccionadas={this.props.piezasSeleccionadas}
                                   numPuzzle={this.props.piezas[k+  this.props.conf.N * this.props.conf.M].numPuzzle}
                                   darVuelta = {this.props.darVuelta}
                                   imagen = {this.props.piezas[k + this.props.conf.N * this.props.conf.M].imgSol}
                                   imagenRev = {this.props.piezas[k + this.props.conf.N * this.props.conf.M].imgRev}
                                // imagenExtra = {this.props.piezas[l].imgExtra}
                                // imagenExtraRev = {this.props.piezas[l].imgExtraRev}

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

    let areaPuzzlePrint = "";
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

                              <Piece posRow={this.props.piezas[o].posRow}
                                posCol={this.props.piezas[o].posCol}
                                row={this.props.piezas[o].row}
                                column={this.props.piezas[o].column}
                                conf={this.props.conf}
                                seleccionarPieza={this.props.seleccionarPieza}
                                piezasSeleccionadas={this.props.piezasSeleccionadas}
                                numPuzzle={this.props.piezas[o].numPuzzle}
                                darVuelta = {this.props.darVuelta}
                                piezaExtra = {this.props.piezas[o].piezaExtra}

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
    let areaPuzzleExtraPrint = "";
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

                              <Piece posRow={this.props.piezas[p + this.props.conf.N * this.props.conf.M].posRow}
                                posCol={this.props.piezas[p + this.props.conf.N * this.props.conf.M].posCol}
                                row={this.props.piezas[p + this.props.conf.N * this.props.conf.M].row}
                                column={this.props.piezas[p + this.props.conf.N * this.props.conf.M].column}
                                conf={this.props.conf}
                                seleccionarPieza={this.props.seleccionarPieza}
                                piezasSeleccionadas={this.props.piezasSeleccionadas}
                                numPuzzle={this.props.piezas[p].numPuzzle}
                                darVuelta = {this.props.darVuelta}
                                piezaExtra = {this.props.piezas[p + this.props.conf.N * this.props.conf.M].piezaExtra}

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
    let areaPuzzlePrintReverso = "";
    if(this.props.conf.image2 !== ""){
      areaPuzzlePrintReverso = (
        <>
          <div className="pagebreak" />
          <h1 className="title titlePrint">Generador de Puzzles</h1>
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
            </tbody>
          </table>
        </>
      );

    }

    let areaPuzzleExtraPrintReverso = "";
    if(this.props.conf.imageExtra1 !== "" && this.props.conf.image2 !== ""){
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
            </tbody>
          </table>
        </>
      );
    }
    return (
      <>
        <div className={"puzzleArea"} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          {/* Componente de área de juego del puzzle*/}
          {areaPuzzle}

          {/* Componente de área de piezas extra*/}
          {areaPiezasExtra}
        </div>

        <Toolkit comprobarCompletado={this.props.comprobarCompletado}
          conf = {this.props.conf}
          toggle = {this.props.toggle}
        />

        {/* Componentes visibles solo en versión de impresión en papel*/}
        {areaPuzzlePrint}
        {areaPuzzleExtraPrint}
        {areaPuzzlePrintReverso}
        {areaPuzzleExtraPrintReverso}

        <Cropper
          ref={cropper => { this.cropper = cropper; }}
          src = {this.state.src}
          style={{height:"100%", width:500, display:'none'}}
          // Cropper.js options
          // aspectRatio={"free"}
          guides={false}
          crop={this._crop.bind(this)}
          data={this.state.data}

        />

        {imagenes.map((imagen, ind)=>{
          return (
            <span key={ind}>
              <img src={imagen}/>
            </span>
          );
        })}

        {imagenesRev.map((imagenRev, ind)=>{
          return (
            <span key={ind}>
              <img src={imagenRev}/>
            </span>
          );
        })}

        {imagenesExtra.map((imagenExtra, ind)=>{
          return (
            <span key={ind}>
              <img src={imagenExtra}/>
            </span>
          );
        })}

        {imagenesExtraRev.map((imagenExtraRev, ind)=>{
          return (
            <span key={ind}>
              <img src={imagenExtraRev}/>
            </span>
          );
        })}
      </>

    );
  }

  motor(){
    this.setState({src:this.props.conf.image1, lock1:true, lock2:false, lock3:false, lock4:false});
    for(let i = 0; i < this.props.piezas.length; i++){
      console.log("MODIFICO 1");
      let x = (this.props.piezas[i].posCol - 1) * ancho;
      let y = (this.props.piezas[i].posRow - 1) * alto;
      this.setState({data:{'x':x, 'y':y, 'width':ancho, 'height':alto}});
    }

    this.setState({src:this.props.conf.image2});
    setTimeout(()=>{
      this.setState({lock1:false, lock2:true, lock3:false, lock4:false});
      for(let j = 0; j < this.props.piezas.length; j++){
        console.log("MODIFICO 2");
        let x = (this.props.piezas[j].posCol - 1) * ancho;
        let y = (this.props.piezas[j].posRow - 1) * alto;
        this.setState({data:{'x':x, 'y':y, 'width':ancho, 'height':alto}});

        // setTimeout(this.setState({data:{'x':x, 'y':y, 'width':320, 'height':360}}), 100);
      }
    }, 1500);
    setTimeout(()=>{ this.setState({src:this.props.conf.imageExtra1});
    }, 2500);
    setTimeout(()=>{
      this.setState({lock1:false, lock2:false, lock3:true, lock4:false});
      for(let i = 0; i < this.props.piezas.length; i++){
        console.log("MODIFICO 3");
        let x = (this.props.piezas[i].posCol - 1) * ancho;
        let y = (this.props.piezas[i].posRow - 1) * alto;
        this.setState({data:{'x':x, 'y':y, 'width':ancho, 'height':alto}});

      }
    }, 3000);

    setTimeout(()=>{
      this.setState({src:this.props.conf.imageExtra2});
    }, 3500);

    setTimeout(()=>{
      this.setState({lock1:false, lock2:false, lock3:false, lock4:true});
      for(let i = 0; i < this.props.piezas.length; i++){
        console.log("MODIFICO 4");
        let x = (this.props.piezas[i].posCol - 1) * ancho;
        let y = (this.props.piezas[i].posRow - 1) * alto;
        this.setState({data:{'x':x, 'y':y, 'width':ancho, 'height':alto}});

      }
    }, 4000);

  }
  _crop(){
    if(this.state.src === this.props.conf.image1 && this.state.lock1){
      console.log("CORTE IMG1");
      imagenes.push(this.cropper.getCroppedCanvas().toDataURL());
    }

    if(this.state.src === this.props.conf.image2 && this.state.lock2){
      console.log("ESTADO LOCK2: " + this.state.lock2);
      console.log("CORTE IMG2");
      imagenesRev.push(this.cropper.getCroppedCanvas().toDataURL());
    }

    if(this.state.src === this.props.conf.imageExtra1 && this.state.lock3){
      console.log("CORTE IMG extra1");

      imagenesExtra.push(this.cropper.getCroppedCanvas().toDataURL());

    }
    if(this.state.src === this.props.conf.imageExtra2 && this.state.lock4){
      console.log("CORTE imgEXTRA2");

      imagenesExtraRev.push(this.cropper.getCroppedCanvas().toDataURL());

    }

    this.props.dispatch(cargarImagenes(imagenes, imagenesRev, imagenesExtra, imagenesExtraRev));

  }

  componentDidMount(){
    let objectives = [];
    objectives.push(new Utils.Objective({id:(1), progress_measure:(1), score:(1)}));
    this.props.dispatch(addObjectives(objectives));
  }
}