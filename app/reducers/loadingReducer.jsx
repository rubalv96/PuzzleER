function loadingReducer(state = true, action){
  switch (action.type){
  case 'UPDATE_PIECES':
    return false;
  case 'LOADED':
    return !action.loaded;
  default:
    return state;
  }
}

export default loadingReducer;