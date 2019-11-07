import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";
export default class Puzzle extends React.Component {
    constructor(props){
        super(props);
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

        return (
            <Fragment>
                <table>
                    {rows.map((row,ind)=>{
                        return(
                            <tr key={ind}>
                                {columns.map((col,ind)=>{
                                    return(
                                        <Fragment key={ind}>
                                            <td >
                                                <Piece row={row} column={col} conf={this.props.conf}/>
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