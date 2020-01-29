function piezasReducer(state = [], action){
  switch (action.type){
  case 'INICIAR_PUZZLE':
    return action.piezas;
  case 'INTERCAMBIAR_PIEZAS':
    var ind1 = -1;
    var ind2 = -1;

    var piezas = Object.assign([], state);
    for(var l = 0; l < piezas.length; l ++){
      if(piezas[l].row === action.payload.row1 && piezas[l].column === action.payload.col1){
        ind1 = l;
      }
      if(piezas[l].row === action.payload.row2 && piezas[l].column === action.payload.col2){
        ind2 = l;
      }
      console.log(piezas[l].row);
    }

    var posRow1 = piezas[ind1].posRow;
    var posRow2 = piezas[ind2].posRow;

    var posCol1 = piezas[ind1].posCol;
    var posCol2 = piezas[ind2].posCol;

    var numPuzzle1 = piezas[ind1].numPuzzle;
    var numPuzzle2 = piezas[ind2].numPuzzle;

    piezas[ind1].posRow = posRow2;
    piezas[ind2].posRow = posRow1;
    piezas[ind1].posCol = posCol2;
    piezas[ind2].posCol = posCol1;
    piezas[ind1].numPuzzle = numPuzzle2;
    piezas[ind2].numPuzzle = numPuzzle1;

    return piezas;

  case 'DAR_VUELTA':
    var piezas = Object.assign([], state);
    for(var l = 0; l < piezas.length; l ++){
      if(piezas[l].row === action.payload.row && piezas[l].column === action.payload.col){
        console.log("Numero puzzle: " + piezas[l].numPuzzle);
        piezas[l].numPuzzle == 1 ? piezas[l].numPuzzle = 2 : piezas[l].numPuzzle = 1;
        return piezas;
      }

    }
    console.log("Estoy en el caso DAR VUELTA!");
    return piezas;

    case 'DAR_VUELTA_TODAS':
      var piezas = Object.assign([], state);
      for(var l = 0; l < piezas.length; l ++){
          piezas[l].numPuzzle == 1 ? piezas[l].numPuzzle = 2 : piezas[l].numPuzzle = 1;
      }
      return piezas;

  default:
    return state;
  }
}

export default piezasReducer;