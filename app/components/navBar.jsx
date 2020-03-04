import React from "react";
import '../assets/scss/main.scss';
import {OverlayTrigger} from "react-bootstrap";
import {Tooltip} from "react-bootstrap";
import Timer from "./Timer";
export default class NavBar extends React.Component {

    render(){
        let pistas = "", contadorPistas="";
        if(this.props.conf.clues){
            pistas = (
                <a className="navbar-brand title" style={{cursor:"pointer" }} onClick={()=>{
                    this.props.mostrarPistas();}}>
                    Pistas y ayuda
                </a>
            );

            contadorPistas=(
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.pistasTooltip()}
                >
                    <a className="navbar-brand title" style={{cursor:"pointer" }}>
                        {this.props.numIntentosPistas}<img src="../assets/images/intentos.png" style={{width: "10%", height: "auto"}}/>
                    </a>
                </OverlayTrigger>
            );
        }
        let contadorIntentos = "";
        if (this.props.conf.numberAttempts !== "-1"){
            contadorIntentos=(
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={this.comprobacionTooltip()}
                >
                    <a className="navbar-brand title" style={{cursor:"pointer" }}>
                        {this.props.numIntentos}<img src="../assets/images/intentos.png" style={{width: "10%", height: "auto"}}/>
                    </a>
                </OverlayTrigger>
            )
        }

        let timer = "";
        if(this.props.conf.time !== ""){
            timer= (
                <Timer conf={this.props.conf} comprobarCompletado={this.props.comprobarCompletado} onStartTime={this.props.onStartTime}/>
            )
        }
        return (
            <nav className="navbar navbar-expand-sm " style={{backgroundColor: "white"}}>
                <a className="navbar-brand title" href="https://github.com/rubalv96/PuzzleER">
                    <img src="../assets/images/intentos.png" width="40px" height="40px"/>
                    </a>
                <a className="navbar-brand title" style={{cursor:"pointer" }} onClick={()=>{
                    this.props.mostrarInstrucciones();}}>
                   ¿Cómo jugar?
                </a>

                {pistas}
                {contadorIntentos}
                {contadorPistas}
                {timer}


            </nav>
        );
    }

    comprobacionTooltip(){
        return (<Tooltip>Intentos de comprobación</Tooltip>);
    }

    pistasTooltip(){
        return (<Tooltip>Intentos de pistas</Tooltip>);
    }
}