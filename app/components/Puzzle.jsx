import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";

export default class Puzzle extends React.Component {
    constructor(props){
        super(props);
         this.aleatoriza=this.aleatoriza.bind(this);
    }

    aleatoriza(rowArray,colArray, arrayFinal){


        while(arrayFinal.length<(this.props.conf.N * this.props.conf.M)) {
            var row= rowArray[Math.floor(Math.random()*this.props.conf.N)];
            var col= colArray[Math.floor(Math.random()*this.props.conf.M)];

            var array= [row,col];
            var prueba=0;
            if (arrayFinal.length === 0) {
                arrayFinal.push(array);
            } else {
                for (var i = 0; i < arrayFinal.length; i++) {
                    if (JSON.stringify(arrayFinal[i])!=JSON.stringify(array)) {
                        prueba++;
                    }
                }
                if(prueba===arrayFinal.length){
                    arrayFinal.push(array);
                }
            }
        }
    }
     render(){
        var rows= []; //rows=[1,2,3,4,5,...,N]

        for(var i=1; i<=this.props.conf.N; i++){
            rows.push(i);
        }

        var columns= []; //rows=[1,2,3,4,5,...,N]

        for(var i=1; i<=this.props.conf.M; i++){
            columns.push(i);
        }

        var arrayFinal=[];
        this.aleatoriza(rows,columns,arrayFinal);
        //Genero JSON
        console.log("El length de arrayFinal es: " + arrayFinal.length);
        puzzlePiezas=[];
        var ri=0;
        var ci=0;
        for (var k=0; k<arrayFinal.length-1; k++) {
             var puzzlePiezas = puzzlePiezas +" {\"posRow\": " + arrayFinal[k][0] + ", \"posCol\": " + arrayFinal[k][1] + ", \"row\": " + rows[ri] + ", \"column\": " + columns[ci] + "},";
             ci ++;
             if(ci === columns.length){
                 ci=0;
                 ri++;
             }
         }
        var puzzleJSON = "[" + puzzlePiezas +" {\"posRow\": " + arrayFinal[arrayFinal.length-1][0] + ", \"posCol\": " + arrayFinal[arrayFinal.length-1][1] + ", \"row\": " + rows[rows.length-1] + ", \"column\": " + columns[columns.length-1] + "}" + "]";

        console.log(puzzleJSON);
        console.log("holaaaa" +puzzleJSON[0].row);

        console.log(arrayFinal);
        console.log("cielo " + this.props.piezas[0].row);
        var l=-1;
        return (
            <Fragment>
                <table>
                    {rows.map((row, ind)=>{
                        return(
                            <tr key = {ind}>
                                {columns.map((col, indC)=>{
                                    l++;
                                    return(
                                        <Fragment key = {indC}>
                                            <td >

                                                <Piece posRow={this.props.piezas[l].posRow}
                                                       posCol= {this.props.piezas[l].posCol}
                                                       row= {this.props.piezas[l].row}
                                                       column= {this.props.piezas[l].column}
                                                       conf= {this.props.conf}
                                                       seleccionarPieza={this.props.seleccionarPieza}
                                                       piezasSeleccionadas={this.props.piezasSeleccionadas}
                                                />
                                            </td>
                                        </Fragment>
                                    )

                                })}
                            </tr>
                        )
                    })}

                </table>

                <img src={this.props.conf.imagen} className="imagenCompleta"/>
            </Fragment>


       )
         return;
    }
}