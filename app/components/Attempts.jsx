import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
let GLOBAL_CONFIG = require('../config/config.js');

export default class Attempts extends React.Component {

  render(){
    let numIntentosTotales = GLOBAL_CONFIG.numberAttempts;
    let numIntentosDisponibles = this.props.numIntentos;
    let arrayTotales = [];
    for(let i = 0; i < numIntentosTotales; i++){
      arrayTotales.push("attemptsNOK");
    }
    for(let j = 0; j < numIntentosDisponibles; j++){
      arrayTotales[j] = "attemptsOK";
    }
    // eslint-disable-next-line radix
    if(parseInt(numIntentosTotales) > 0){
      return (
        <>

          <div className="attemptsContainer">
            {arrayTotales.map((div, ind)=>{
              return <img key={ind} src="../assets/images/intentos.png" style={{width:600 / numIntentosTotales}}
                className={div} alt={"Intentos disponibles"}/>;
            })}

          </div>
        </>
      );
    }
    return (<></>);

  }
}