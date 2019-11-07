import React, {Fragment} from 'react';

export default class Piece extends React.Component{
    render() {

         var altoImg=400;
        var anchoImg=700;

        //Fabrico el tamaño del contenedor
        var anchoContenedor = anchoImg/this.props.conf.M;
        var altoContenedor = altoImg/this.props.conf.N;


        //Calculo de las posiciones de las fotos
        var top= -((this.props.row -1)* altoImg/this.props.conf.N)+"px" ;
        var left = -((this.props.column-1)*anchoImg/this.props.conf.M)+"px";



        return (
            <Fragment>
               {/*<p>Pieza {this.props.row}.{this.props.column}</p>*/}
                <div
                    // className="piezaCont"
                    src={this.props.conf.imagen}
                    style={{
                        width: anchoContenedor + "px",
                        height: altoContenedor + "px",
                        overflow: "hidden",
                        margin: "0.5px",
                        position: "relative"
                    }}
                >
                    <img
                        // className={img}
                         style={{
                             position: "absolute",
                             left: left,
                             top: top,
                             margin: "auto",
                             minHeight: "100%",
                             minWidth: "100%",
                             width: "700px",
                             height: "400px"
                         }}
                         src={this.props.conf.imagen} />
                </div>
            </Fragment>

    );
    }
}