console.log("Init task: Cropping images");

//Require
const {resolve} = require('path');
const fs = require('fs-extra');
const configPath = resolve(__dirname, '../app/config/config.js');
const destPath = resolve(__dirname, '../app/assets/images/crop/');
let sizeOf = require('image-size');
var MD5 = require("crypto-js/md5");

let Clipper = require('image-clipper');
let Canvas = require('canvas');
let clipper = Clipper();
Clipper.configure({
  canvas: Canvas
})

let GLOBAL_CONFIG = require(configPath);
console.log(GLOBAL_CONFIG);

//Get images from config
let images = [GLOBAL_CONFIG.image1]; //image1 must be the solution

if(typeof GLOBAL_CONFIG.image2 === "string"){
  images.push(GLOBAL_CONFIG.image2);
}
if(typeof GLOBAL_CONFIG.imageExtra1 === "string"){
  images.push(GLOBAL_CONFIG.imageExtra1);
}
if(typeof GLOBAL_CONFIG.imageExtra2 === "string"){
  images.push(GLOBAL_CONFIG.imageExtra2);
}

//Global vars
let currentImage = 0;
let currentRow = 0;
let currentColumn = 0;
let generatedImages = [];
let solucion = "";

cropNextImage = function(callback){
  if(currentImage >= images.length){
    return callback();
  }

  currentRow = 0;
  currentColumn = 0;
  currentImage = currentImage+1;

  let imagePath = resolve(__dirname, '../app/' + images[currentImage-1]);
  sizeOf(imagePath, function (err, dimensions) {
    let imageWidth = dimensions.width;
    let imageHeight = dimensions.height;

    let squareWidth = imageWidth/GLOBAL_CONFIG.M;
    let squareHeight = imageHeight/GLOBAL_CONFIG.N;

    cropNextPiece(imagePath,squareWidth,squareHeight,function(){
      console.log("Cropped image " + currentImage);
      return cropNextImage(callback);
    })
  });
}

cropNextPiece = function(image,width,height,callback){
  crop(image,width*currentRow,height*currentColumn,width,height,function(){
    console.log("Cropped piece [" + currentRow + "," + currentColumn + "] from image " + currentImage);

    let lastPiece = ((currentRow===GLOBAL_CONFIG.N-1) && (currentColumn===GLOBAL_CONFIG.M-1));
    if(lastPiece===true){
      return callback();
    }
    if(currentRow<GLOBAL_CONFIG.N-1){
      currentRow = currentRow+1;
    } else if(currentColumn<GLOBAL_CONFIG.M-1) {
      currentRow = 0;
      currentColumn = currentColumn+1;
    }
    return cropNextPiece(image,width,height,callback);
  });
}

crop = function(image,x,y,width,height,callback,){
  let pieceId = generatePieceId();
  // let imageDestPath = destPath + "/image" + (currentImage + "_row" + currentRow + "_column" + currentColumn + "id_" + pieceId + ".jpg");
  let imageDestPath = destPath + "/" + pieceId + ".jpg";
  Clipper(image, function() {
    this.crop(x,y,width,height)
    .quality(100)
    .toFile(imageDestPath, function() {
      generatedImages.push({id: pieceId, path: "./assets/images/crop/" + pieceId + ".jpg"})
      if(currentImage === 1){
        solucion = solucion + pieceId;
      }
      callback();
    });
  });
}

let generated_ids = [];
generatePieceId = function(){
  let id_candidate = Math.round(Math.random()*100000) + "";
  if(generated_ids.indexOf(id_candidate)===-1){
    generated_ids.push(id_candidate);
    return id_candidate;
  } else {
    if(generated_ids.length < 1000){
      return generateImageid();
    }
  }
}

shuffle = function(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

prepareConfigFile = function(){
  let keysToDelete = ["image1","image2","imageExtra1","imageExtra2"];
  for(let i=0; i<keysToDelete.length; i++){
    delete GLOBAL_CONFIG[keysToDelete[i]]
  }

  //Disable test_production
  GLOBAL_CONFIG.test_production_file = false;

  //Save images
  GLOBAL_CONFIG["images"] = shuffle(generatedImages);

  //Save cyphered solution
  GLOBAL_CONFIG["solution"] = MD5(solucion).toString();


  console.log("Production config file");
  console.log(GLOBAL_CONFIG);

  const configDestPath = resolve(__dirname, '../app/config/config_production.json');
  fs.writeFileSync(configDestPath, JSON.stringify(GLOBAL_CONFIG));
}

cropNextImage(function(){
  prepareConfigFile();
  console.log("\n\n Crop finished");
});