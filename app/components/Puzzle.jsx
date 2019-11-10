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
        console.log("El puzzle es: " + this.props.puzzle)
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
        console.log(arrayFinal);
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

                                                <Piece posRow={arrayFinal[l][0]}
                                                       posCol= {arrayFinal[l][1]}
                                                       row= {row}
                                                       column= {col}
                                                       conf= {this.props.conf}/>
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
    }
}