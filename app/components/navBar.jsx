import React from "react";
import '../assets/scss/main.scss';
import {OverlayTrigger} from "react-bootstrap";
import {Tooltip} from "react-bootstrap";
import Timer from "./Timer";
import {Navbar, Nav} from "react-bootstrap";

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

          <Nav.Item style={{margin:"auto", marginRight:"30%", minWidth:"100%", textAlign:"right"}}>
            <Timer showMinutes style={{width:"100%"}} time={this.props.conf.time} onFinishTime={this.onFinish} onStartTime={this.props.onStartTime}/>

          </Nav.Item>
        </Nav>

      );
    }

    // Flip icon
    let darVuelta = "";
    if(this.props.conf.reverseMode){
      darVuelta =
                (
                  <Nav.Item style={{marginRight:"30%"}}>
                    <img width="50"
                      height="50"
                      className="d-inline-block align-top icon"
                      src="./assets/icons/flip.svg"
                      title="Dar vuelta"
                      style={{cursor:"pointer"}}
                      onClick={()=>{this.props.toggle();}}

                    />
                  </Nav.Item>
                );

    }

    // Zoom icon
    let zoom;
    if(this.props.conf.zoomMode){

      zoom = (
        <Nav.Item style={{marginRight:"30%"}}>
          <img width="50"
            height="50"
            className="d-inline-block align-top icon"
            src="./assets/icons/zoom-in.svg"
            title={this.props.lupaValue ? "Desactivar zoom" : "Activar zoom"}
            style={{cursor:"pointer", filter:this.props.lupaValue ? "" : "grayscale(100%)"}}
            onClick={()=>{this.props.lupa();}}

          />
        </Nav.Item>

      );
    }

    return (
      <>
        <Navbar bg="transparent" expand="lg" style={{width:"100%"}}>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item style={{marginRight:"30%"}}>
                <img width="50"
                  height="50"
                  className="d-inline-block align-top icon"
                  src="./assets/icons/instructions.svg"
                  title="¿Cómo jugar?"
                  style={{cursor:"pointer"}}
                  onClick={()=>{this.props.mostrarInstrucciones();}}

                />
              </Nav.Item>
              {darVuelta}
              {zoom}
              <Nav.Item style={{marginRight:"30%"}}>
                <img width="50"
                  height="50"
                  className="d-inline-block align-top icon"
                  src="./assets/icons/solution.svg"
                  title="Comprobar solución"
                  style={{cursor:"pointer"}}
                  onClick={()=>{this.props.comprobarCompletado();}}

                />
              </Nav.Item>

            </Nav>

          </Navbar.Collapse>
          <span style={{fontFamily:"Megrim", textAlign:"center", width:"50%", fontSize:"3.5vw"}}>
            {this.props.conf.title}
          </span>

          <span style={{width:"10%"}}>
            {timer}
          </span>

        </Navbar>

      </>

    // <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"transparent !important", height:"75px !important", margin:"auto"}}>
    //     <img width="7%" height="auto" src="./assets/icons/logo.svg" className="navbar-brand" title="PuzzleER"/>
    //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
    //             aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //         <span className="navbar-toggler-icon"></span>
    //     </button>
    //
    //     <div className="collapse navbar-collapse" id="navbarNav">
    //         <ul className="navbar-nav" style={{width:"100%"}}>
    //             <li className="nav-item" style={{marginRight:"5%", marginLeft:"7%"}}>
    //                 <img style={{maxWidth:"70px", maxHeight:"70px", cursor:"pointer"}}
    //                      src="./assets/icons/instructions.svg"
    //                      className="nav-link"
    //                      title="¿Cómo jugar?"
    //                      onClick={()=>{this.props.mostrarInstrucciones();}}
    //                 />
    //             </li>
    //
    //
    //             {zoom}
    //
    //             {darVuelta}
    //
    //             <li className="nav-item" style={{ marginRight:"5%"}}>
    //                 <img style={{maxWidth:"70px", maxHeight:"70px", cursor:"pointer"}}
    //                      src="./assets/icons/solution.svg"
    //                      className="nav-link"
    //                      title= "Comprobar solución"
    //                      onClick={()=>{this.props.comprobarCompletado();}}
    //                 />
    //             </li>
    //
    //             {timer}
    //
    //         </ul>
    //     </div>
    // </nav>
    );
  }

  onFinish(){
    this.props.onFinishTime("gameover");
  }

}