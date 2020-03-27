let GLOBAL_CONFIG = require('../config/config.js');
let MD5 = require("crypto-js/md5");

let idPieza, ids = "";

function puzzleCompletoReducer(state = [], action){
  let piezas, numPuzzle, completado;
  switch (action.type){
  case 'COMPROBAR_COMPLETADO':
    // Comprueba si se ha completado el puzzle
    piezas = action.payload.piezas;
    completado = false;
    ids = "";

    for(let row = 1; row <= GLOBAL_CONFIG.N; row++){
      for(let col = 1; col <= GLOBAL_CONFIG.M; col++){
        for(let p in piezas){
          let pieza = piezas[p];
          if(pieza.row === row && pieza.column === col){
            idPieza = piezas[p].faceImgId;
            ids = ids.concat(idPieza);
          }
        }
      }
    }

    completado = (MD5(ids).toString() === GLOBAL_CONFIG.solution);

    // Lanza la solución a Escapp
    fetch("https://escapp.dit.upm.es/api/escapeRooms/" + GLOBAL_CONFIG.escapeRoomId + "/puzzles/" + GLOBAL_CONFIG.puzzleId + "/check", {
      method:'POST',
      body:JSON.stringify({token:"ruben.alvarezg@alumnos.upm.es", solution:MD5(ids).toString()}),
      headers:{"Content-type":"application/json"},
    })
      .then(res => res.json())
      .then(res => console.log(res));

    return completado;

  default:
    return state;
  }
}

export default puzzleCompletoReducer;