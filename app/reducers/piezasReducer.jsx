function piezasReducer(state = [], action){
    switch (action.type){
        case 'INICIAR_PUZZLE':
            return action.piezas;
        default:
            return state;
    }
}



export default piezasReducer;