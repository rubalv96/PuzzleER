function seleccionarPiezasReducer(state = [], action){

  switch (action.type){
  case 'SELECT_PIECE':
    return action.selectedPieces;

  default:
    return state;
  }
}

export default seleccionarPiezasReducer;