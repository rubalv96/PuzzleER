let GLOBAL_CONFIG = require('../config/config.js');

function piezasReducer(state = [], action){

  // Variables usadas en el switch-case

  // Action INICIAR_PUZZLE
  let i, puzzle, piezasExtra, r, c;

  // Action INTERCAMBIAR_PIEZAS
  let piezas, ind1, ind2, imgFaceId1, imgFaceId2, imgReverseId1, imgReverseId2, numPuzzle1, numPuzzle2, posCol1, posCol2, img1, img2, imgRev1, imgRev2;
  let numPiezasExtra;
  switch (action.type){
  case 'INICIAR_PUZZLE':

    puzzle = [];
    piezas = GLOBAL_CONFIG.pieces.slice(0, GLOBAL_CONFIG.M * GLOBAL_CONFIG.N);
    piezasExtra = GLOBAL_CONFIG.pieces.slice(GLOBAL_CONFIG.M * GLOBAL_CONFIG.N, GLOBAL_CONFIG.M * GLOBAL_CONFIG.N + GLOBAL_CONFIG.fake_pieces);
    r = 1;
    c = 1;

    for(let l in piezas){
      let pieza = piezas[l];
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
    }

    r = 1; c = 1;
    for(let p in piezasExtra){
      let pieza = piezasExtra[p];

      puzzle.push(
        {
          "row":"E" + c,
          "column":"E" + c,
          "faceImgId":pieza.face.id,
          "reverseImgId":pieza.reverse.id,
          "faceImgPath":pieza.face.path,
          "reverseImgPath":pieza.reverse.path,
        }
      );
      c++;
    }

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

  default:
    return state;
  }

}

export default piezasReducer;