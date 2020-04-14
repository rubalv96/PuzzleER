function seleccionarPiezasReducer(state = [], action){

  let estado;
  switch (action.type){
  case 'SELECCIONAR_PIEZA':
    estado = Object.assign([], state);
    // Select the first piece
    if(estado[0][0] === -1){
      estado[0][0] = action.payload.row;
      estado[0][1] = action.payload.col;
      return estado;
    }
    // Select a new first piece
    if(estado[0][0] !== -1 && estado[1][0] !== -1){
      estado[0][0] = action.payload.row;
      estado[0][1] = action.payload.col;
      estado[1][0] = -1;
      estado[1][1] = -1;
      return estado;
    }
    // Unselect a piece previously selected
    if(estado[0][0] !== -1 && action.payload.row === estado[0][0] && action.payload.col === estado[0][1]){
      estado[0][0] = -1;
      estado[0][1] = -1;
      return estado;
    }

    // Select a second piece
    if(estado[0][0] !== -1){
      estado[1][0] = action.payload.row;
      estado[1][1] = action.payload.col;
      return estado;
    }
    return estado;

  default:
    return state;
  }
}

export default seleccionarPiezasReducer;