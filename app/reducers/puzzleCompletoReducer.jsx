
function puzzleCompletoReducer(state = [], action){
  switch (action.type){
  case 'COMPROBAR_COMPLETADO':
    // Comprueba si se ha completado el puzzle
    var puzzle = action.payload.piezas;
    var completado = true;
    var numPuzzle = action.payload.piezas[0].numPuzzle;

    for(let i = 0; i < action.payload.N * action.payload.M; i++){
      if(!(puzzle[i].posRow === puzzle[i].row && puzzle[i].posCol === puzzle[i].column && puzzle[i].numPuzzle === numPuzzle)){
        completado = false;
      }
    }

    return completado;

  default:
    return state;
  }
}

export default puzzleCompletoReducer;