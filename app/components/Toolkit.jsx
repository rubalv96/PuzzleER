import React from "react";
import '../assets/scss/main.scss';
export default class Toolkit extends React.Component {
  render(){
    let toggleButton = "", btnComprobar = "";
    if(this.props.conf.image2 !== ""){
      toggleButton =
                (<div className="cont" style={{display:"inline"}}>
                  <label className="switch" >
                    <input type="checkbox" onClick={this.props.toggle}/>
                    <span className="slider round" />
                  </label>
                </div>);
    }
    btnComprobar = (
      <div className="btnComprobar" style={{display:"inline", padding:"5px"}}>
        <img src="../assets/images/check.png" width={"50px"} height={"50px"} style={{cursor:"pointer", opacity:"0.8"}} onClick={this.props.comprobarCompletado} alt={"Comprobar"}/>
      </div>);

    return (
      <div className={"toolkitContainer"}>
        {toggleButton}
        {btnComprobar}
      </div>
    );
  }
}