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

export function objectiveAccomplished(objectiveId, accomplishedScore = null){
  return {
    type:'OBJECTIVE_ACCOMPLISHED',
    objective_id:objectiveId,
    accomplished_score:accomplishedScore,
  };
}

export function loaded(is_loaded = true){
  return {
    type:'LOADED',
    loaded:is_loaded,
  };
}

export function updatePieces(newPieces){
  return {
    type:'UPDATE_PIECES',
    newPieces: newPieces,
  };
}

export function selectPiece(selectedPieces){
  return {
    type:'SELECT_PIECE',
    selectedPieces: selectedPieces,
  };
}

export function checkSolution(isCompleted){
  return {
    type:'CHECK_SOLUTION',
    completed:isCompleted,
  };
}