import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactCardFlip from 'react-card-flip';
import {Tooltip} from "react-bootstrap";

export default class Piece extends React.Component {

  constructor(){
    super();
    this.state = {
      isFlipped:false,
      backToFront:"1.5",
      frontToBack:"1.5",
      anchoVentana:window.innerWidth,
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  handleClick(e){
    e.preventDefault();
    if(this.props.conf.reverseMode === true){
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

    let altoImg, anchoImg;
    const relacion = 430 / 700; // Relacion entre ancho y alto de la imagen

    this.props.extraArea && !this.props.print ? anchoImg = 0.35 * (this.state.anchoVentana) : anchoImg = 0.6 * (this.state.anchoVentana);
    altoImg = anchoImg * relacion;

    // Tamaño del contenedor
    let anchoContenedor = anchoImg / (this.props.conf.M);
    let altoContenedor = altoImg / (this.props.conf.N);

    // Color del borde de la pieza dependiendo de si está seleccionada o no
    let rowPieza = this.props.row;
    let colPieza = this.props.column;

    let rowSelec1 = this.props.piezasSeleccionadas[0][0];
    let colSelec1 = this.props.piezasSeleccionadas[0][1];
    let rowSelec2 = this.props.piezasSeleccionadas[1][0];
    let colSelec2 = this.props.piezasSeleccionadas[1][1];

    let borde;

    (rowPieza === rowSelec1 && colPieza === colSelec1)
        || (rowPieza === rowSelec2 && colPieza === colSelec2)
      ? borde = "3px black solid" : borde = "1px black solid";

    if(rowSelec1 !== -1 && rowSelec2 !== -1){
      borde = "1px black solid";
    }

    // Cursor sobre la pieza
    let cursor = "";
    if(this.props.lupa){
      cursor = "zoom-in";
      console.log("Cursor: " + cursor);
    }

    // Imagen de pieza en posición frontal
    let imgPieza = (
      <img
        style={{
          overflow:"hidden",
          margin:"auto",
          width:anchoContenedor,
          height:altoContenedor,
        }}
        src={this.props.imagen}
        onClick={()=>{
          if(this.props.lupa){
            this.props.zoomImage(this.props.imagen, anchoContenedor, altoContenedor, this.props.extraArea);
          }
          else {
            this.props.seleccionarPieza(this.props.row, this.props.column);
          }
        }}

        alt={"Imagen de pieza"}/>
    );

    // Imagen de pieza en posición de reverso
    let imgPiezaRev = (
      <img
        style={{
          margin:"auto",
          overflow:"hidden",
          width:anchoContenedor,
          height:altoContenedor,

        }}
        src={this.props.imagenRev}
        onClick={()=>{
          if(this.props.lupa){
            this.props.zoomImage(this.props.imagen);
          }
          else {
            this.props.seleccionarPieza(this.props.row, this.props.column);
          } }}

        alt={"Imagen de pieza"}
      />
    );

    let cardFlip = (

      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal" flipSpeedBackToFront={this.state.backToFront} flipSpeedFrontToBack={this.state.frontToBack}>

        {/* Contenedor de la pieza frontal*/}

        <div
          onDoubleClick={this.handleClick}
          style={{
            width:anchoContenedor + "px",
            height:altoContenedor + "px",
            overflow:"hidden",
            position:"relative",
            border:borde,
            borderRadius:"0px",
            cursor:cursor,

          }}
        >

          {imgPieza}
        </div>

        {/* Contenedor de la pieza trasera*/}
        <div
          onDoubleClick={this.handleClick}
          style={{
            width:anchoContenedor + "px",
            height:altoContenedor + "px",
            overflow:"hidden",
            position:"relative",
            border:borde,
            borderRadius:"0px",
            cursor:cursor,

          }}
        >
          {imgPiezaRev}
        </div>

      </ReactCardFlip>
    );

    return (
      <Fragment>

        {cardFlip}

      </Fragment>

    );
  }

  updateDimensions(){
    this.setState({anchoVentana:window.innerWidth});
  }
  componentDidMount(){
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.updateDimensions);
  }

}