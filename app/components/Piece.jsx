import React, {Fragment} from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Piece extends React.Component {

    render(){
        //Dimensiones del puzzle
        let altoImg = 400;
        let anchoImg = 700;

        // Fabrico el tamaño del contenedor
        let anchoContenedor = anchoImg / this.props.conf.M;
        let altoContenedor = altoImg / this.props.conf.N;

        // Calculo de las posiciones de las fotos
        let top = -((this.props.posRow - 1) * altoImg / this.props.conf.N) + "px";
        let left = -((this.props.posCol - 1) * anchoImg / this.props.conf.M) + "px";

        // Color del borde de la piza dependiendo de si está seleccionada o no
        let rowPieza = this.props.row;
        let colPieza = this.props.column;

        let rowSelec1 = this.props.piezasSeleccionadas[0][0];
        let colSelec1 = this.props.piezasSeleccionadas[0][1];
        let rowSelec2 = this.props.piezasSeleccionadas[1][0];
        let colSelec2 = this.props.piezasSeleccionadas[1][1];

        let borde = "";

        (rowPieza === rowSelec1 && colPieza === colSelec1)
        || (rowPieza === rowSelec2 && colPieza === colSelec2)
            ? borde = "1px yellow solid" : borde = "1px purple solid";

        if (rowSelec1 !== -1 && rowSelec2!==-1) {
            borde = "1px purple solid";
        }
        console.log("PiezaSeleccionada: (" + rowSelec1 + "," + colSelec1 + "), (" + rowSelec2 + ", " + colSelec2 + ")");


        return (
            <Fragment>
                {/*Contenedor de la pieza*/}
                <div
                    style={{
                        width:anchoContenedor + "px",
                        height:altoContenedor + "px",
                        overflow:"hidden",
                        position:"relative",
                        border:borde,
                        borderRadius:"0px",

                    }}
                >
                    {/*Imagen de la pieza*/}
                    <img
                        style={{
                            position:"absolute",
                            left:left,
                            top:top,
                            margin:"auto",
                            //minHeight:"100%",
                            //minWidth:"100%",
                            width:anchoImg,
                            height:altoImg,
                        }}
                        src={this.props.conf.image}
                        onClick={()=>{
                            this.props.seleccionarPieza(this.props.row, this.props.column);
                            console.log("Has clickado en la pieza " + this.props.row + this.props.column +
                                " que corresponde a las pos: " + this.props.posRow + this.props.posCol);

                        }}
                    />
                </div>
            </Fragment>

        );
    }
}