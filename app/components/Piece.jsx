import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Piece extends React.Component {

  render(){
    // Dimensiones del puzzle
      let altoImg;
      let anchoImg;
      this.props.conf.heightImg == "" ? altoImg=400 : altoImg=Number.parseInt(this.props.conf.heightImg);
      this.props.conf.widthImg == "" ? anchoImg=600 : anchoImg=Number.parseInt(this.props.conf.widthImg);


    // Fabrico el tamaño del contenedor
    let anchoContenedor = anchoImg / this.props.conf.M;
    let altoContenedor = altoImg / this.props.conf.N;

    // Calculo de las posiciones de las fotos
    let top = -((this.props.posRow - 1) * altoImg / this.props.conf.N) + "px";
    let left = -((this.props.posCol - 1) * anchoImg / this.props.conf.M) + "px";

    // Color del borde de la piza dependiendo de si está seleccionada o no
    let rowPieza = this.props.row;
    let colPieza = this.props.column;

    let rowSelec1 = this.props.piezasSeleccionadas[0][0];
    let colSelec1 = this.props.piezasSeleccionadas[0][1];
    let rowSelec2 = this.props.piezasSeleccionadas[1][0];
    let colSelec2 = this.props.piezasSeleccionadas[1][1];

    let borde = "";

    (rowPieza === rowSelec1 && colPieza === colSelec1)
        || (rowPieza === rowSelec2 && colPieza === colSelec2)
      ? borde = "1px yellow solid" : borde = "1px purple solid";

    if(rowSelec1 !== -1 && rowSelec2 !== -1){
      borde = "1px purple solid";
    }
    console.log("PiezaSeleccionada: (" + rowSelec1 + "," + colSelec1 + "), (" + rowSelec2 + ", " + colSelec2 + ")");

    let img ="";
    this.props.numPuzzle == 1 ? img = this.props.conf.image1 : img = this.props.conf.image2;

      if(this.props.piezaExtra && this.props.numPuzzle ===1)
          img =this.props.conf.imageExtra1;
      if (this.props.piezaExtra && this.props.numPuzzle ===2)
          img =this.props.conf.imageExtra2;

    let imgPieza = (
        <img
            style={{
                position:"absolute",
                left:left,
                top:top,
                margin:"auto",
                width:anchoImg,
                height:altoImg,
            }}
            src={img}
            onClick={()=>{
                this.props.seleccionarPieza(this.props.row, this.props.column);

            }}

            onDoubleClick={()=>{
                //Acción que cambia la imagen de la pieza
                this.props.darVuelta(this.props.row, this.props.column);
            }}
        />
    );
    return (
      <Fragment>
        {/* Contenedor de la pieza*/}
        <div
            className={"imgPiece"}
          style={{
            width:anchoContenedor + "px",
            height:altoContenedor + "px",
            overflow:"hidden",
            position:"relative",
            border:borde,
            borderRadius:"0px",

          }}
        >
            {imgPieza}

        </div>
      </Fragment>

    );
  }
}