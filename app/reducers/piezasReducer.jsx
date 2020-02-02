
function piezasReducer(state = [], action){
  let l;
  switch (action.type){
  case 'INICIAR_PUZZLE':
    let rows = []; // rows=[1,2,3,4,5,...,N]

    for(let i = 1; i <= action.payload.N; i++){
      rows.push(i); // rows=[1,2,3,4,5,...,N]
    }

    let columns = []; // columns=[1,2,3,4,5,...,M]

    for(let i = 1; i <= action.payload.M; i++){
      columns.push(i); // columns=[1,2,3,4,5,...,M]
    }

    let arrayFinal = [];

    action.payload.aleatoriza(rows, columns, arrayFinal);
    let puzzlePiezas = [];
    let rowIndex = 0;
    let columnIndex = 0;
    for(let k = 0; k < arrayFinal.length - 1; k++){
      // Se crea el objeto JSON con las piezas y sus posiciones
      // los parámetros row y column indican la posición donde se encuentran las piezas
      // los parámetros posRow y posCol indican las posiciones del trozo de imagen equivalente que se muestra al usuario

      puzzlePiezas = puzzlePiezas + " {\"posRow\": " + arrayFinal[k][0] + ", \"posCol\": " + arrayFinal[k][1] + ", \"row\": " + rows[rowIndex] + ", \"column\": " + columns[columnIndex] + ", \"numPuzzle\" : 1" +", \"piezaExtra\" : false"  +"},";
      columnIndex++;
      if(columnIndex === columns.length){
        columnIndex = 0;
        rowIndex++;
      }
    }
    let puzzleJSON = "[" + puzzlePiezas + " {\"posRow\": " + arrayFinal[arrayFinal.length - 1][0] + ", \"posCol\": " + arrayFinal[arrayFinal.length - 1][1] + ", \"row\": " + rows[rows.length - 1] + ", \"column\": " + columns[columns.length - 1] + ", \"numPuzzle\" : 1" +", \"piezaExtra\" : false"  + "}]";
    let puzzle = JSON.parse(puzzleJSON);

    //MODIFICO PUZZLE PARA METER EXTRAS
    let numPiezasExtra = action.payload.numPiezas;
    let piezasEscogidas=[];
    action.payload.aleatoriza2(numPiezasExtra, piezasEscogidas);
    piezasEscogidas.forEach(pieza => {
        let isExtraRandom = action.payload.aleatorizaTrueFalse();
        puzzle[pieza].piezaExtra = isExtraRandom;
        console.log("La pieza: " + puzzle[pieza].row + puzzle[pieza].column + "tiene el valor piezaExtra a :" + puzzle[pieza].piezaExtra);
        puzzle.push({"row": "E"+puzzle[pieza].row,"column":"E"+puzzle[pieza].column, "posRow": puzzle[pieza].posRow, "posCol": puzzle[pieza].posCol, "numPuzzle": puzzle[pieza].numPuzzle, "piezaExtra": !isExtraRandom});

    });
    return puzzle;

  case 'INTERCAMBIAR_PIEZAS':
    var ind1 = -1;
    var ind2 = -1;

    var piezas = Object.assign([], state);


    for(let l = 0; l < piezas.length; l ++){

      if(piezas[l].row === action.payload.row1 && piezas[l].column === action.payload.col1){
        ind1 = l;
      }
      if(piezas[l].row === action.payload.row2 && piezas[l].column === action.payload.col2){
        ind2 = l;
      }

    }

    var posRow1 = piezas[ind1].posRow;
    var posRow2 = piezas[ind2].posRow;

    var posCol1 = piezas[ind1].posCol;
    var posCol2 = piezas[ind2].posCol;

    var numPuzzle1 = piezas[ind1].numPuzzle;
    var numPuzzle2 = piezas[ind2].numPuzzle;

    var isExtra1 = piezas[ind1].piezaExtra;
    var isExtra2 = piezas[ind2].piezaExtra;

    piezas[ind1].posRow = posRow2;
    piezas[ind2].posRow = posRow1;
    piezas[ind1].posCol = posCol2;
    piezas[ind2].posCol = posCol1;
    piezas[ind1].numPuzzle = numPuzzle2;
    piezas[ind2].numPuzzle = numPuzzle1;
    piezas[ind1].piezaExtra = isExtra2;
    piezas[ind2].piezaExtra = isExtra1;

    return piezas;

  case 'DAR_VUELTA':
    var piezas = Object.assign([], state);
    for(l = 0; l < piezas.length; l ++){
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
    for(l = 0; l < piezas.length; l ++){
      piezas[l].numPuzzle == 1 ? piezas[l].numPuzzle = 2 : piezas[l].numPuzzle = 1;
    }
    return piezas;

  default:
    return state;
  }
}



export default piezasReducer;