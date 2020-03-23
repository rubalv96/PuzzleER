let GLOBAL_CONFIG = require('../config/config.js');

function piezasReducer(state = [], action){

  // Variables usadas en el switch-case

  // Action INICIAR_PUZZLE
  let i, columns = [], rows = [], arrayFinal = [], rowIndex = 0,
    columnIndex = 0, puzzle, puzzlePiezas = [], puzzleJSON,
    piezasEscogidas = [], piezasExtra, r, c;

  // Action INTERCAMBIAR_PIEZAS
  let piezas, ind1, ind2, imgFaceId1, imgFaceId2, imgReverseId1, imgReverseId2, numPuzzle1, numPuzzle2, posCol1, posCol2, img1, img2, imgRev1, imgRev2;
  let numPiezasExtra, g=0;
  switch (action.type){
  case 'INICIAR_PUZZLE':
    for(i = 1; i <= action.payload.N; i++){
      rows.push(i); // rows=[1,2,3,4,5,...,N]
    }
    for(i = 1; i <= action.payload.M; i++){
      columns.push(i); // columns=[1,2,3,4,5,...,M]
    }

    action.payload.aleatoriza(rows, columns, arrayFinal);

    puzzle= [];
    piezas = GLOBAL_CONFIG.pieces.slice(0, GLOBAL_CONFIG.M * GLOBAL_CONFIG.N);
    piezasExtra= GLOBAL_CONFIG.pieces.slice( GLOBAL_CONFIG.M * GLOBAL_CONFIG.N , GLOBAL_CONFIG.M * GLOBAL_CONFIG.N + GLOBAL_CONFIG.Mextra * GLOBAL_CONFIG.Nextra );
    console.log("piezasExtra: " + JSON.stringify(piezasExtra));
    r = 1;
    c = 1;

    for(var l in piezas){
      var pieza = piezas[l];
      if(c === GLOBAL_CONFIG.M + 1){
        r++;
        c = 1;
      }
      puzzle.push(
        {
          "row":r,
          "column":c,
          "faceImgId":pieza.face.id,
          "reverseImgId":pieza.reverse.id,
          "faceImgPath":pieza.face.path,
          "reverseImgPath":pieza.reverse.path,
        }
      );
      c++;
      console.log(JSON.stringify(puzzle));
    }

    r=1; c=1;
    for(var p in piezasExtra){
      var pieza = piezasExtra[p];
      if(c === GLOBAL_CONFIG.Mextra + 1){
        r++;
        c = 1;
      }
      puzzle.push(
        {
          "row":"E"+r,
          "column":"E"+c,
          "faceImgId":pieza.face.id,
          "reverseImgId":pieza.reverse.id,
          "faceImgPath":pieza.face.path,
          "reverseImgPath":pieza.reverse.path,
        }
      );
      c++;
      console.log(JSON.stringify(puzzle));
    }



    // for(i = 0; i < GLOBAL_CONFIG.pieces.length -1; i++){
    //   // Se crea el objeto JSON con las piezas y sus posiciones
    //   // los parámetros row y column indican la posición donde se encuentran las piezas
    //   // los parámetros posRow y posCol indican las posiciones del trozo de imagen equivalente que se muestra al usuario
    //
    //   puzzlePiezas = puzzlePiezas + " { \"row\": " + rows[rowIndex] + ", \"column\": " + columns[columnIndex] + ", \"faceImgPath\": \""+GLOBAL_CONFIG.pieces[i].face.path + "\", \"reverseImgPath\": \""+GLOBAL_CONFIG.pieces[i].reverse.path+"\""+ ", \"faceImgId\": \""+ GLOBAL_CONFIG.pieces[i].face.id+"\"" + ", \"reverseImgId\": \""+ GLOBAL_CONFIG.pieces[i].reverse.id +"\"" +"},";
    //   console.log("GLOBAL CONFIG IMAGES: !!!!!!!!!!!!!!!!!!!!! :" + GLOBAL_CONFIG.pieces[i].face.path);
    //   columnIndex++;
    //   if(columnIndex === columns.length){
    //     columnIndex = 0;
    //     rowIndex++;
    //   }
    // }
    // puzzleJSON = "[" + puzzlePiezas + " { \"row\": " + rows[rows.length-1]+ ", \"column\": " + columns[columns.length -1] + ", \"faceImgPath\": \""+GLOBAL_CONFIG.pieces[GLOBAL_CONFIG.pieces.length -1].face.path + ", \"reverseImgPath\": \""+GLOBAL_CONFIG.pieces[GLOBAL_CONFIG.pieces.length -1].reverse.path+"\""+ ",\"faceImgId\": \""+GLOBAL_CONFIG.pieces[GLOBAL_CONFIG.pieces.length -1].face.id +"\""+", \"reverseImgId\": \""+GLOBAL_CONFIG.pieces[GLOBAL_CONFIG.pieces.length -1].reverse.id + "\"" + "}]";
    // puzzle = JSON.parse(puzzleJSON);

    // // En caso de piezas extra, se añaden al final del JSON del puzzle.
    // numPiezasExtra = action.payload.numPiezas;
    // // De todas las piezas que hay en el puzzle se escoge aleatoriamente un conjunto de ellas para que formen parte
    // // del área extra
    // action.payload.aleatoriza2(numPiezasExtra, piezasEscogidas);
    // // Por cada pieza escogida se va a añadir una pieza al puzzle JSON, que tendrá aleatoriamente caracter de extra o no.
    // piezasEscogidas.forEach(pieza => {
    //   let isExtraRandom = action.payload.aleatorizaTrueFalse();
    //   puzzle[pieza].piezaExtra = isExtraRandom;
    //   puzzle.push({"row":"E" + puzzle[pieza].row, "column":"E" + puzzle[pieza].column, "posRow":puzzle[pieza].posRow, "posCol":puzzle[pieza].posCol, "numPuzzle":puzzle[pieza].numPuzzle, "piezaExtra":!isExtraRandom, "imgSol":"../assets/images/loading.gif", "imgRev": "../assets/images/loading.gif", "imgExtra":0, "imgExtraRev":0});
    // });
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

    img1 = piezas[ind1].faceImgPath;
    img2 = piezas[ind2].faceImgPath;

    imgRev1 = piezas[ind1].reverseImgPath;
    imgRev2 = piezas[ind2].reverseImgPath;

      imgFaceId1 = piezas[ind1].faceImgId;
      imgFaceId2 = piezas[ind2].faceImgId;

      imgReverseId1 = piezas[ind1].reverseImgId;
      imgReverseId2 = piezas[ind2].reverseImgId;


    piezas[ind1].faceImgPath = img2;
    piezas[ind2].faceImgPath = img1;

    piezas[ind1].reverseImgPath = imgRev2;
    piezas[ind2].reverseImgPath = imgRev1;

      piezas[ind1].faceImgId = imgFaceId2;
      piezas[ind2].faceImgId = imgFaceId1;

      piezas[ind1].reverseImgId = imgReverseId2;
      piezas[ind2].reverseImgId = imgReverseId1;

    return piezas;

  case 'DAR_VUELTA':
    piezas = Object.assign([], state);
    for(i = 0; i < piezas.length; i ++){
      if(piezas[i].row === action.payload.row && piezas[i].column === action.payload.col){

        let imgReverse = piezas[i].reverseImgPath;
        let imgFace = piezas[i].faceImgPath;
        piezas[i].faceImgPath = imgReverse;
        piezas[i].reverseImgPath = imgFace;

        return piezas;
      }

    }
    return piezas;

  case 'DAR_VUELTA_TODAS':
    piezas = Object.assign([], state);
    for(i = 0; i < piezas.length; i ++){
      let imgReverse = piezas[i].reverseImgPath;
      let imgFace = piezas[i].faceImgPath;
      piezas[i].faceImgPath = imgReverse;
      piezas[i].reverseImgPath = imgFace;
    }
    return piezas;

    case 'CARGAR_IMAGENES':
      piezas = Object.assign([], state);
      numPiezasExtra = GLOBAL_CONFIG.Nextra * GLOBAL_CONFIG.Mextra;
      g=0;

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