let GLOBAL_CONFIG = require('../config/config.js');
let MD5 = require("crypto-js/md5");

let idPieza, ids = "";

function puzzleCompletoReducer(state = false, action){
  switch (action.type){
  case 'COMPROBAR_COMPLETADO':
    return action.completado;
  default:
    return state;
  }
}

export default puzzleCompletoReducer;