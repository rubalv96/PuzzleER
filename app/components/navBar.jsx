import React from "react";
import '../assets/scss/main.scss';
import Timer from "./Timer";
import {Navbar, Nav} from "react-bootstrap";
import Icon from './Icon';

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.onFinish = this.onFinish.bind(this);
  }
  render(){

    // Timer countdown
    let timer = "";
    if(this.props.conf.time > 0){
      timer = (
        <Nav className="mr-auto">

          <Nav.Item className="timerNav">
            <Timer showMinutes style={{width:"100%"}} time={this.props.conf.time} onFinishTime={this.onFinish} onStartTime={this.props.onStartTime}/>
          </Nav.Item>
        </Nav>

      );
    }

    
    let icons = [];

    //Instructions icon
    icons.push(
      {
        imagePath: "./assets/icons/instructions.svg",
        title: "¿Cómo jugar?",
        onClick: this.props.mostrarInstrucciones,
      }
    );

    // Flip icon
    if(this.props.conf.reverseMode){
      icons.push({
        imagePath: "./assets/icons/flip.svg",
        title: "Dar vuelta",
        onClick: this.props.toggle,
      })
      

    }

    // Zoom icon
    if(this.props.conf.zoomMode){
      icons.push(
        {
          imagePath: "./assets/icons/zoom-in.svg",
          title: this.props.lupaValue ? "Desactivar zoom" : "Activar zoom",
          onClick: this.props.lupa,
        }
      )
     
    }

    //Check solution icon
    icons.push({
      imagePath: "./assets/icons/solution.svg",
      title: "Comprobar solución",
      onClick: this.props.comprobarCompletado,
    });

    return (
      <>
        <Navbar bg="transparent" expand="lg" style={{width:"100%"}}>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            {icons.map((icon,index)=>{
                return(
                  <Icon
                    key= {index}
                    imagePath={icon.imagePath}
                    title= {icon.title}
                    onClick = {icon.onClick}
                  />
                );
              })}
          
            </Nav>

          </Navbar.Collapse>
          <span className="titleEscapeNavBar">
            {this.props.conf.title}
          </span>

          <span style={{width:"10%"}}>
            {timer}
          </span>

        </Navbar>

      </>

    );
  }

  onFinish(){
    this.props.onFinishTime("gameover");
  }

}