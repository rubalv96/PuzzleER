import {GLOBAL_CONFIG} from "../config/config";

function piezasReducer(state = [], action){

  // Variables usadas en el switch-case

  // Action INICIAR_PUZZLE
  let i, columns = [], rows = [], arrayFinal = [], rowIndex = 0,
    columnIndex = 0, puzzle, puzzlePiezas = [], puzzleJSON,
    numPiezasExtra, piezasEscogidas = [];

  // Action INTERCAMBIAR_PIEZAS
  let piezas, ind1, ind2, posRow1, posRow2, isExtra1, isExtra2, numPuzzle1, numPuzzle2, posCol1, posCol2, img1, img2, imgRev1, imgRev2;

  switch (action.type){
  case 'INICIAR_PUZZLE':
    for(i = 1; i <= action.payload.N; i++){
      rows.push(i); // rows=[1,2,3,4,5,...,N]
    }
    for(i = 1; i <= action.payload.M; i++){
      columns.push(i); // columns=[1,2,3,4,5,...,M]
    }

    action.payload.aleatoriza(rows, columns, arrayFinal);

    for(i = 0; i < arrayFinal.length - 1; i++){
      // Se crea el objeto JSON con las piezas y sus posiciones
      // los parámetros row y column indican la posición donde se encuentran las piezas
      // los parámetros posRow y posCol indican las posiciones del trozo de imagen equivalente que se muestra al usuario

      puzzlePiezas = puzzlePiezas + " {\"posRow\": " + arrayFinal[i][0] + ", \"posCol\": " + arrayFinal[i][1] + ", \"row\": " + rows[rowIndex] + ", \"column\": " + columns[columnIndex] + ", \"numPuzzle\" : 1" + ", \"piezaExtra\" : false" + ", \"imgSol\" : \"../assets/images/loading.gif\" "+ ", \"imgRev\" : \"../assets/images/loading.gif\""+ ", \"imgExtra\" : \"../assets/images/loading.gif\"" + ", \"imgExtraRev\" : \"../assets/images/loading.gif\"" +"},";
      columnIndex++;
      if(columnIndex === columns.length){
        columnIndex = 0;
        rowIndex++;
      }
    }
    puzzleJSON = "[" + puzzlePiezas + " {\"posRow\": " + arrayFinal[arrayFinal.length - 1][0] + ", \"posCol\": " + arrayFinal[arrayFinal.length - 1][1] + ", \"row\": " + rows[rows.length - 1] + ", \"column\": " + columns[columns.length - 1] + ", \"numPuzzle\" : 1" + ", \"piezaExtra\" : false" + ", \"imgSol\" : \"../assets/images/loading.gif\""+", \"imgRev\" : \"../assets/images/loading.gif\""+ ", \"imgExtra\" : \"../assets/images/loading.gif\"" + ", \"imgExtraRev\" : \"../assets/images/loading.gif\""  +"}]";
    puzzle = JSON.parse(puzzleJSON);

    // En caso de piezas extra, se añaden al final del JSON del puzzle.
    numPiezasExtra = action.payload.numPiezas;
    // De todas las piezas que hay en el puzzle se escoge aleatoriamente un conjunto de ellas para que formen parte
    // del área extra
    action.payload.aleatoriza2(numPiezasExtra, piezasEscogidas);
    // Por cada pieza escogida se va a añadir una pieza al puzzle JSON, que tendrá aleatoriamente caracter de extra o no.
    piezasEscogidas.forEach(pieza => {
      let isExtraRandom = action.payload.aleatorizaTrueFalse();
      puzzle[pieza].piezaExtra = isExtraRandom;
      puzzle.push({"row":"E" + puzzle[pieza].row, "column":"E" + puzzle[pieza].column, "posRow":puzzle[pieza].posRow, "posCol":puzzle[pieza].posCol, "numPuzzle":puzzle[pieza].numPuzzle, "piezaExtra":!isExtraRandom, "imgSol":0, "imgRev":0, "imgExtra":0, "imgExtraRev":0});
    });
    return puzzle;

    case 'INTERCAMBIAR_PIEZAS':
    ind1 = -1;
    ind2 = -1;

    piezas = Object.assign([], state);

    for(i = 0; i < piezas.length; i ++){

      if(piezas[i].row === action.payload.row1 && piezas[i].column === action.payload.col1){
        ind1 = i;
      }
      if(piezas[i].row === action.payload.row2 && piezas[i].column === action.payload.col2){
        ind2 = i;
      }

    }

    posRow1 = piezas[ind1].posRow;
    posRow2 = piezas[ind2].posRow;

    posCol1 = piezas[ind1].posCol;
    posCol2 = piezas[ind2].posCol;

    numPuzzle1 = piezas[ind1].numPuzzle;
    numPuzzle2 = piezas[ind2].numPuzzle;

    isExtra1 = piezas[ind1].piezaExtra;
    isExtra2 = piezas[ind2].piezaExtra;

    img1 = piezas[ind1].imgSol;
    img2 = piezas[ind2].imgSol;

    imgRev1 = piezas[ind1].imgRev;
    imgRev2 = piezas[ind2].imgRev;

    piezas[ind1].posRow = posRow2;
    piezas[ind2].posRow = posRow1;

    piezas[ind1].posCol = posCol2;
    piezas[ind2].posCol = posCol1;

    piezas[ind1].numPuzzle = numPuzzle2;
    piezas[ind2].numPuzzle = numPuzzle1;

    piezas[ind1].piezaExtra = isExtra2;
    piezas[ind2].piezaExtra = isExtra1;

    piezas[ind1].imgSol = img2;
    piezas[ind2].imgSol = img1;

    piezas[ind1].imgRev = imgRev2;
    piezas[ind2].imgRev = imgRev1;

    return piezas;

  case 'DAR_VUELTA':
    piezas = Object.assign([], state);
    for(i = 0; i < piezas.length; i ++){
      if(piezas[i].row === action.payload.row && piezas[i].column === action.payload.col){
        piezas[i].numPuzzle === 1 ? piezas[i].numPuzzle = 2 : piezas[i].numPuzzle = 1;
        return piezas;
      }

    }
    return piezas;

  case 'DAR_VUELTA_TODAS':
    piezas = Object.assign([], state);
    for(i = 0; i < piezas.length; i ++){
      piezas[i].numPuzzle === 1 ? piezas[i].numPuzzle = 2 : piezas[i].numPuzzle = 1;
    }
    return piezas;

    case 'CARGAR_IMAGENES':
      piezas = Object.assign([], state);
      let numPiezasExtra = GLOBAL_CONFIG.Nextra * GLOBAL_CONFIG.Mextra;
      let g=0;

      for(let k = 0; k < piezas.length - numPiezasExtra; k ++){
        if(piezas[k].piezaExtra){
          piezas[k].imgSol = action.payload.imagenesExtra[g];
          piezas[k].imgRev = action.payload.imagenesExtraRev[g];
          g++;
          for(let f=piezas.length-numPiezasExtra; f<piezas.length; f++){
            if(piezas[k].posRow === piezas[f].posRow && piezas[f].posCol === piezas[k].posCol){
              piezas[f].imgSol = action.payload.imagenes[k];
              piezas[f].imgRev = action.payload.imagenesRev[k];
            }
          }
        }
        else{
          piezas[k].imgSol = action.payload.imagenes[k];
          piezas[k].imgRev = action.payload.imagenesRev[k];
        }

      }

      for(let u=piezas.length-numPiezasExtra; u<piezas.length; u++){
        if(piezas[u].piezaExtra){
          piezas[u].imgSol = action.payload.imagenesExtra[g];
          piezas[u].imgRev = action.payload.imagenesExtraRev[g];
          g++;
        }
      }


      return piezas;

  default:
    return state;
  }


}

export default piezasReducer;