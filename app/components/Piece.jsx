import React, {Fragment} from 'react';

export default class Piece extends React.Component{
    render() {
        return (
            <Fragment>
                <p>Pieza {this.props.row}.{this.props.column}</p>
                <div className="piezaCont" src={this.props.conf.imagen} >
                    <img className="imagen2" src={this.props.conf.imagen} />
                </div>
            </Fragment>

    );
    }
}