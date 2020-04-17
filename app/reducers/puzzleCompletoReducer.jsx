function puzzleCompletoReducer(state = false, action){
  switch (action.type){
  case 'CHECK_SOLUTION':
    return action.completed;
  default:
    return state;
  }
}

export default puzzleCompletoReducer;