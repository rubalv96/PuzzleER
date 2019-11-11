import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";

export default class Puzzle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var rows = []; //rows=[1,2,3,4,5,...,N]
        for (var i = 1; i <= this.props.conf.N; i++) {
            rows.push(i);
        }
        var columns = []; //rows=[1,2,3,4,5,...,N]
        for (var i = 1; i <= this.props.conf.M; i++) {
            columns.push(i);
        }


        var l = -1;

        return (

            <Fragment>
                <table>
                    {rows.map((row, ind) => {
                        return (
                            <tr key={ind}>
                                {columns.map((col, indC) => {
                                    l++;
                                    return (
                                        <Fragment key={indC}>
                                            <td>

                                                <Piece posRow={this.props.piezas[l].posRow}
                                                       posCol={this.props.piezas[l].posCol}
                                                       row={this.props.piezas[l].row}
                                                       column={this.props.piezas[l].column}
                                                       conf={this.props.conf}
                                                       seleccionarPieza={this.props.seleccionarPieza}
                                                       piezasSeleccionadas={this.props.piezasSeleccionadas}
                                                />
                                            </td>
                                        </Fragment>)
                                })}

                            </tr>)
                    })}
                </table>
                 <img src={this.props.conf.imagen} className="imagenCompleta"/>
            </Fragment>
        );
    }
}