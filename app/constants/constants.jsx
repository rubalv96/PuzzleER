export const INITIAL_STATE = {
  tracking:{
    progress_measure:0,
    score:0,
    success:false,
    completion:false,
    objectives:{},
    finished:false,
  },
  scorm:null,
  user_profile:{
    id:undefined,
    name:"Unknown",
    learner_preference:{},
  },
  wait_for_user_profile:false,
  piezas:{},
  piezasSeleccionadas:[[-1, -1], [-1, -1]],
  puzzleCompleto:false,
};