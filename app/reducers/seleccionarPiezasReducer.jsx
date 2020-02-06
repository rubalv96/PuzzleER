function seleccionarPiezasReducer(state = [], action){

  let estado;
  switch (action.type){
  case 'SELECCIONAR_PIEZA':
    estado = Object.assign([], state);
    // Seleccionar una primera pieza
    if(estado[0][0] === -1){
      estado[0][0] = action.payload.row;
      estado[0][1] = action.payload.col;
      return estado;
    }
    // Seleccionar una nueva primera pieza
    if(estado[0][0] !== -1 && estado[1][0] !== -1){
      estado[0][0] = action.payload.row;
      estado[0][1] = action.payload.col;
      estado[1][0] = -1;
      estado[1][1] = -1;
      return estado;
    }
    // Si el usuario selecciona pieza que ya está seleccionada, se deselecciona.
    if(estado[0][0] !== -1 && action.payload.row === estado[0][0] && action.payload.col === estado[0][1]){
      estado[0][0] = -1;
      estado[0][1] = -1;
      return estado;
    }

    // Seleccionar una segunda pieza
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