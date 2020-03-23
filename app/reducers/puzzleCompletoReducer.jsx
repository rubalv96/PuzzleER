let GLOBAL_CONFIG = require('../config/config.js');
var MD5 = require("crypto-js/md5");

let idPieza,ids="";

function puzzleCompletoReducer(state = [], action){
  let piezas, numPuzzle, completado ;
  switch (action.type){
  case 'COMPROBAR_COMPLETADO':
    // Comprueba si se ha completado el puzzle
    piezas = action.payload.piezas;
    completado = false;
    ids="";

    for(let row=1; row<=GLOBAL_CONFIG.N; row++){
      for(let col=1; col<=GLOBAL_CONFIG.M; col++){
        for(var p in piezas){
          var pieza = piezas[p];
          if(pieza.row===row && pieza.column===col){
            idPieza = piezas[p].faceImgId;
            ids = ids.concat(idPieza);
            console.log(idPieza);

          }
        }
      }
    }

    completado = (MD5(ids).toString() === GLOBAL_CONFIG.solution);
    console.log(ids);
    console.log(MD5(ids).toString());

    return completado;

  default:
    return state;
  }
}

export default puzzleCompletoReducer;