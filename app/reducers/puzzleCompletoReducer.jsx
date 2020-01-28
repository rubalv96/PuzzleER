function puzzleCompletoReducer(state = [], action){
    switch (action.type){
        case 'PUZZLE_COMPLETO':
            return true;

        default:
            return state;
    }
}



export default puzzleCompletoReducer;