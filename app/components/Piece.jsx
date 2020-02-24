import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactCardFlip from 'react-card-flip';

export default class Piece extends React.Component {
  constructor(){
    super();
    this.state = {
      isFlipped:false,
      backToFront:"1.5",
      frontToBack:"1.5",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    if(this.props.conf.image2 !== ""){
      this.setState({
        backToFront:"1.5",
        frontToBack:"1.5",
      });
      this.setState(prevState => ({isFlipped:!prevState.isFlipped}));
      setTimeout(()=>{this.props.darVuelta(this.props.row, this.props.column);
        this.setState({
          backToFront:"0",
        });
        this.setState(prevState => ({isFlipped:!prevState.isFlipped}));},
      1000);
    }

  }

  render(){

    // Dimensiones del puzzle
    let altoImg;
    let anchoImg;
    this.props.conf.heightImg === "" ? altoImg = 300 : altoImg = parseInt(this.props.conf.heightImg, 10);
    this.props.conf.widthImg === "" ? anchoImg = 500 : anchoImg = parseInt(this.props.conf.widthImg, 10);

    // Tamaño del contenedor
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

    let borde;

    (rowPieza === rowSelec1 && colPieza === colSelec1)
        || (rowPieza === rowSelec2 && colPieza === colSelec2)
      ? borde = "3px #487329 solid" : borde = "1px #93A603 solid";

    if(rowSelec1 !== -1 && rowSelec2 !== -1){
      borde = "1px #93A603 solid";
    }

    // Selección de imagen de la pieza en posición frontal o en reverso

    let img, imgRev;
    this.props.numPuzzle === 1 ? img = this.props.conf.image1 : img = this.props.conf.image2;
    this.props.numPuzzle === 1 ? imgRev = this.props.conf.image2 : imgRev = this.props.conf.image1;

    if(this.props.piezaExtra && this.props.numPuzzle === 1)
    {
      img = this.props.conf.imageExtra1;
      imgRev = this.props.conf.imageExtra2;
    }
    if(this.props.piezaExtra && this.props.numPuzzle === 2)
    {
      img = this.props.conf.imageExtra2;
      imgRev = this.props.conf.imageExtra1;

    }

    // Imagen de pieza en posición frontal
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

        alt={"Imagen de pieza"}/>
    );

    // Imagen de pieza en posición de reverso
    let imgPiezaRev = (
      <img
        style={{
          position:"absolute",
          left:left,
          top:top,
          margin:"auto",
          width:anchoImg,
          height:altoImg,
        }}
        src={imgRev}
        onClick={()=>{
          this.props.seleccionarPieza(this.props.row, this.props.column);
        }}

        alt={"Imagen de pieza"}
      />
    );
    return (
      <Fragment>

        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal" flipSpeedBackToFront={this.state.backToFront} flipSpeedFrontToBack={this.state.frontToBack}>
          {/* Contenedor de la pieza frontal*/}
          <div
            className={"imgPiece"}
            onDoubleClick={this.handleClick}
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

          {/* Contenedor de la pieza trasera*/}
          <div
            className={"imgPiece"}
            onDoubleClick={this.handleClick}
            style={{
              width:anchoContenedor + "px",
              height:altoContenedor + "px",
              overflow:"hidden",
              position:"relative",
              border:borde,
              borderRadius:"0px",

            }}
          >
            {imgPiezaRev}
          </div>

        </ReactCardFlip>
      </Fragment>

    );
  }
}