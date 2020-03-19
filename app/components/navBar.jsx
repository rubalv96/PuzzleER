import React from "react";
import '../assets/scss/main.scss';
import {OverlayTrigger} from "react-bootstrap";
import {Tooltip} from "react-bootstrap";
import Timer from "./Timer";

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.onFinish = this.onFinish.bind(this);
  }
  render(){
    let pistas = "", contadorPistas = "";
    if(this.props.conf.clues){
      pistas = (
        <a className="navbar-brand title" style={{cursor:"pointer"}} onClick={()=>{
          this.props.mostrarPistas();}}>
                    Pistas y ayuda
        </a>
      );

      contadorPistas = (
        <OverlayTrigger
          placement="bottom"
          delay={{show:250, hide:400}}
          overlay={this.pistasTooltip()}
        >
          <a className="navbar-brand title" style={{cursor:"pointer"}}>
            {this.props.numIntentosPistas}<img src="../assets/images/intentos.png" style={{width:"10%", height:"auto"}} alt={"Intentos de Pistas"}/>
          </a>
        </OverlayTrigger>
      );
    }
    let contadorIntentos = "";
    if(this.props.conf.numberAttempts !== "-1"){
      contadorIntentos = (
        <OverlayTrigger
          placement="bottom"
          delay={{show:250, hide:400}}
          overlay={this.comprobacionTooltip()}
        >
          <a className="navbar-brand title" style={{cursor:"pointer"}}>
            {this.props.numIntentos}<img src="../assets/images/intentos.png" style={{width:"10%", height:"auto"}}/>
          </a>
        </OverlayTrigger>
      );
    }

    let timer = "";
    if(this.props.conf.time !== ""){
      timer = (
        <Timer showMinutes time={this.props.conf.time} onFinishTime={this.onFinish} onStartTime={this.props.onStartTime}/>
      );
    }

    let darVuelta = "";
    if(this.props.conf.image2 !== ""){
      darVuelta =
                (
                  <div>
                    <a className="navbar-brand title" style={{color:"dark", cursor:"pointer", padding:"auto", paddingRight:"20px"}}
                      onClick={()=>{this.props.toggle();}}
                    >
                            Girar las piezas
                    </a>

                  </div>
                );

    }
    return (
      <nav className="navbar navbar-light navbar-expand-xl " style={{backgroundColor:"transparent !important", height:"75px !important"}}>
        <a className="navbar-brand title" href="https://github.com/rubalv96/PuzzleER">
          <img src="../assets/images/intentos.png" width="40px" height="40px"/>
        </a>
        <a className="navbar-brand title" style={{color:"dark", cursor:"pointer", paddingLeft:"30px", paddingRight:"30px"}} onClick={()=>{
          this.props.mostrarInstrucciones();}}>
                   ¿Cómo jugar?
        </a>

        {darVuelta}

        <a className="navbar-brand title" style={{color:"dark", cursor:"pointer", padding:"auto"}} onClick={()=>{this.props.comprobarCompletado();}}>
                    Comprobar solución
        </a>
        {pistas}
        {contadorIntentos}
        {contadorPistas}
        {timer}

      </nav>
    );
  }
  onFinish(){
    this.props.onFinishTime("gameover");
    console.log("Hola");
  }

  comprobacionTooltip(){
    return (<Tooltip>Intentos de comprobación</Tooltip>);
  }

  pistasTooltip(){
    return (<Tooltip>Intentos de pistas</Tooltip>);
  }
}