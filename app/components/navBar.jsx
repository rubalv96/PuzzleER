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

    let timer = "";
    if(this.props.conf.time !== ""){
      timer = (
        <Timer showMinutes time={this.props.conf.time} onFinishTime={this.onFinish} onStartTime={this.props.onStartTime}/>
      );
    }

    let darVuelta = "";
    if(this.props.conf.reverseMode){
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
      let subrayado = "";
      if(this.props.lupa){
        subrayado = "underline";
      }
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
        <a className="navbar-brand title" style={{color:"dark", cursor:"pointer", padding:"auto", paddingRight:"20px"}} onClick={()=>{this.props.lupa();}}>
          <span style={{textDecoration:this.props.lupaValue ? "underline" : "none"}}>Hacer zoom</span>
        </a>

        {darVuelta}

        <a className="navbar-brand title" style={{color:"dark", cursor:"pointer", padding:"auto"}} onClick={()=>{this.props.comprobarCompletado();}}>
                    Comprobar solución
        </a>

        {timer}

      </nav>
    );
  }

  onFinish(){
    this.props.onFinishTime("gameover");
  }

  comprobacionTooltip(){
    return (<Tooltip>Intentos de comprobación</Tooltip>);
  }

  pistasTooltip(){
    return (<Tooltip>Intentos de pistas</Tooltip>);
  }
}