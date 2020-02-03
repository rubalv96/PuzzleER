export function scormConnected(scorm){
  return {
    type:'SCORM_CONNECTED',
    scorm:scorm,
  };
}

export function updateUserProfile(user_profile){
  return {
    type:'UPDATE_USER_PROFILE',
    user_profile:user_profile,
  };
}

export function addObjectives(objectives){
  return {
    type:'ADD_OBJECTIVES',
    objectives:objectives,
  };
}

export function resetObjectives(){
  return {
    type:'RESET_OBJECTIVES',
  };
}

export function objectiveAccomplished(objectiveId, accomplishedScore = null){
  return {
    type:'OBJECTIVE_ACCOMPLISHED',
    objective_id:objectiveId,
    accomplished_score:accomplishedScore,
  };
}

// Example of action created using the redux-thunk middleware for Redux
export function objectiveAccomplishedThunk(objectiveId, accomplishedScore = null){
  return (dispatch, getState) => {
    const firstState = JSON.parse(JSON.stringify(getState()));
    dispatch(objectiveAccomplished(objectiveId, accomplishedScore));

    // Perform another action after accomplishing the objective
    const secondState = getState();
    if((typeof firstState.tracking.objectives[objectiveId] === "object") && (firstState.tracking.objectives[objectiveId].accomplished === false) && (typeof secondState.tracking.objectives[objectiveId] === "object") && (secondState.tracking.objectives[objectiveId].accomplished === true)){
      // Objective with id objectiveId was accomplished.
      // Do something and/or dispatch another action.
      console.log("Objective with id " + objectiveId + " was accomplished.");
      dispatch(showDialog("Objective with id " + objectiveId + " was accomplished."));
    }
  };
}

export function showDialog(text){
  return () => {
    alert(text);
  };
}

export function finishApp(finished = true){
  return {
    type:'FINISH_APP',
    finished:finished,
  };

}

export function iniciarPuzzle(N, M, aleatoriza, numPiezas, aleatoriza2, aleatorizaTrueFalse){
  return {
    type:'INICIAR_PUZZLE',
    payload:{
      N: N,
      M: M,
      aleatoriza: aleatoriza,
      numPiezas: numPiezas,
      aleatoriza2: aleatoriza2,
      aleatorizaTrueFalse: aleatorizaTrueFalse,
    },
  };
}

export function seleccionarPieza(row, col){
  return {
    type:'SELECCIONAR_PIEZA',
    payload:{
      row:row,
      col:col,
    },
  };
}

export function intercambiarPiezas(piezasSeleccionadas){
  return {
    type:'INTERCAMBIAR_PIEZAS',
    payload:{
      row1:piezasSeleccionadas[0][0],
      col1:piezasSeleccionadas[0][1],
      row2:piezasSeleccionadas[1][0],
      col2:piezasSeleccionadas[1][1],
    },
  };
}


export function darVuelta(row, col){
  return {
    type:'DAR_VUELTA',
    payload:{
      row:row,
      col:col,
    },
  };
}

export function darVueltaTodas() {
  return {
    type: 'DAR_VUELTA_TODAS',

  };
}

export function comprobarCompletado(piezas, N, M){
  return {
    type:'COMPROBAR_COMPLETADO',
    payload:{
      piezas:piezas,
      N:N,
      M:M,
    },
  };
}
