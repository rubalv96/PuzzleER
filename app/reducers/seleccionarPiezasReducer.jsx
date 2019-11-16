function seleccionarPiezasReducer(state = [], action){
    switch (action.type){
        case 'SELECCIONAR_PIEZA':
            var estado = Object.assign([], state);
            if(estado[0][0]===-1){
                estado[0][0] = action.payload.row;
                estado[0][1] = action.payload.col;
                return estado;
            }

            if(estado[0][0] !== -1 && estado[1][0] !==-1){
                estado[0][0]=action.payload.row;
                estado[0][1]=action.payload.col;
                estado[1][0]=-1;
                estado[1][1]=-1;
                return estado;
            }

            if(estado[0][0] !== -1){
                estado[1][0] = action.payload.row;
                estado[1][1] = action.payload.col;
                return estado;
            }

        default:
            return state;
    }
}



export default seleccionarPiezasReducer;