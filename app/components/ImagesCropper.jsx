import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cropper from "react-cropper";
import {GLOBAL_CONFIG} from "../config/config";
import {cargarImagenes} from "../reducers/actions";

let ancho = (1280/GLOBAL_CONFIG.M);
let alto = (720/GLOBAL_CONFIG.N);
const imagenes = []
const imagenesRev = []
const imagenesExtra = []
const imagenesExtraRev = []
export default class ImagesCropper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: {
                'x': 0,
                'y': 0,
                'width': 320,
                'height': 360,
            },
            lock: false,
        }
        this.motor = this.motor.bind(this);
    }


    motor() {
        console.log("MOTOR CROPPER 1");
        this.setState({lock: true});
        for (let i = 0; i < this.props.piezas.length; i++) {
            let x = (this.props.piezas[i].posCol - 1) * ancho;
            console.log("x: " + x);
            let y = (this.props.piezas[i].posRow - 1) * alto;
            console.log("y: " + y);
            this.setState({datos: {'x': x, 'y': y, 'width': ancho, 'height': alto}});
            console.log(this.state.datos.x);
        }
    }

    _crop(){
        console.log("ME HE METIDO EN EL CROP");
        if(this.props.imagenes=== "imagenes" && this.state.lock){
            imagenes.push(this.cropper.getCroppedCanvas().toDataURL());
        }

        if(this.props.imagenes=== "imagenesRev" && this.state.lock){
            imagenesRev.push(this.cropper.getCroppedCanvas().toDataURL());
        }

        if(this.props.imagenes=== "imagenesExtra"  && this.state.lock){
            imagenesExtra.push(this.cropper.getCroppedCanvas().toDataURL());
        }

        if(this.props.imagenes=== "imagenesExtraRev"  && this.state.lock){
            imagenesExtraRev.push(this.cropper.getCroppedCanvas().toDataURL());
        }
    }

    render(){
        console.log("HOLA X: " +this.state.datos.x);


        return (
            <Cropper
                ref={cropper => { this.cropper = cropper; }}
                src = {this.props.imagen}
                style={{height:"100%", width:500, display:'none'}}
                // Cropper.js options
                // aspectRatio={"free"}
                guides={false}
                crop={this._crop.bind(this)}
                data={this.state.datos}

            />

        );
    }

    componentDidMount() {
        setTimeout(
            ()=>{this.motor();},
            1000);
        setTimeout(
            ()=>{this.props.dispatch(cargarImagenes(imagenes, imagenesRev, imagenesExtra, imagenesExtraRev));},
            2000);
    }
}