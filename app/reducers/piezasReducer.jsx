let GLOBAL_CONFIG = require('../config/config.js');

function piezasReducer(state = [], action){

  switch (action.type){
  case 'UPDATE_PIECES':
    console.log("UPDATED PIECES: " + action.newPieces);
    return action.newPieces;
  default:
    return state;
  }

}


export default piezasReducer;