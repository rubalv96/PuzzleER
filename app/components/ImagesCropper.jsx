import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cropper from "react-cropper";
let GLOBAL_CONFIG = require('../config/config.js');
import {cargarImagenes} from "../reducers/actions";

let ancho = (1920 / GLOBAL_CONFIG.M);
let alto = (1358 / GLOBAL_CONFIG.N);
const imagenes = [];
const imagenesRev = [];
const imagenesExtra = [];
const imagenesExtraRev = [];
export default class ImagesCropper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      anchoImagen:0,
      altoImagen:0,
      lock:false,
      datos:{
        'x':0,
        'y':0,
        'width':0,
        'height':0,
      },
    };
    this.motor = this.motor.bind(this);
  }

  motor(){
    console.log("MOTOR CROPPER 1");
    console.log("naturalWidth: " + this.cropper.getImageData().naturalWidth);
    console.log("naturalHeight: " + this.cropper.getImageData().naturalHeight);
    this.setState({lock:true});
    for(let i = 0; i < this.props.piezas.length; i++){
      let x = (this.props.piezas[i].posCol - 1) * ancho;
      console.log("x: " + x);
      let y = (this.props.piezas[i].posRow - 1) * alto;
      console.log("y: " + y);
      this.setState({datos:{'x':x, 'y':y}});
    }
  }

  _crop(){
    console.log("ME HE METIDO EN EL CROP");
    if(this.props.imagenes === "imagenes" && this.state.lock){
      imagenes.push(this.cropper.getCroppedCanvas().toDataURL());
    }

    if(this.props.imagenes === "imagenesRev" && this.state.lock){
      imagenesRev.push(this.cropper.getCroppedCanvas().toDataURL());
    }

    if(this.props.imagenes === "imagenesExtra" && this.state.lock){
      imagenesExtra.push(this.cropper.getCroppedCanvas().toDataURL());
    }

    if(this.props.imagenes === "imagenesExtraRev" && this.state.lock){
      imagenesExtraRev.push(this.cropper.getCroppedCanvas().toDataURL());
    }
  }

  render(){
    console.log("Length de imagenes: " + imagenes.length);
    return (
      <Cropper
        ref={cropper => { this.cropper = cropper; }}
        src = {this.props.imagen}
        style={{height:"200", width:"200", display:'none'}}
        // Cropper.js options
        // aspectRatio={"free"}
        guides={false}
        crop={this._crop.bind(this)}
        data={this.state.datos}
        type={"hidden"}

      />

    );
  }

  componentDidMount(){
    setTimeout(
      ()=> {
        this.setState(
          {
            datos:{
              'width':this.cropper.getImageData().naturalWidth / GLOBAL_CONFIG.M,
              'height':this.cropper.getImageData().naturalHeight / GLOBAL_CONFIG.N,
            },
          });

      }, 800);
    setTimeout(
      ()=>{this.motor();},
      1000);
    setTimeout(
      ()=>{this.props.dispatch(cargarImagenes(imagenes, imagenesRev, imagenesExtra, imagenesExtraRev));},
      2000);
  }
}