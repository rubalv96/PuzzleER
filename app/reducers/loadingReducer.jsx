function loadingReducer(state = true, action){
  switch (action.type){
  case 'INICIAR_PUZZLE':
    return false;
  case 'LOADED':
    return !action.loaded;
  default:
    return state;
  }
}

export default loadingReducer;