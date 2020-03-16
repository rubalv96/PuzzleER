export let GLOBAL_CONFIG = {
  dev:{
    //Imagen de fondo
    imageBackground:"./assets/images/noruega.jpg", // imagen de fondo
    opacityBackground:".7", // opacidad de la imagen

    //Imagenes de las piezas
    image1:"./assets/images/egipto.jpg", // imagen solución
    image2:"./assets/images/cactus.jpg", // imagen solución reverso
    imageExtra1:"./assets/images/taj_mahal.jpg", // imagen señuelo cara
    imageExtra2:"./assets/images/noruega.jpg", // imagen señuelo reverso



    //Dimensiones del puzzle
    M:6, // numero de columnas del puzzle
    N:6, // numero de filas del puzzle
    Mextra:5, // numero de columnas del area de piezas sobrantes
    Nextra:1, // número de filas del área de piezas sobrantes

    //Timer
    time:"", // tiempo en segundos para resolver el puzzle

    //Cuadro de puzzle
    heightImg:"", // tamaño altura cuadro de puzzles
    widthImg:"", // tamaño anchura de cuadro de puzzles

    //Modo juego independiente
    numberAttempts:"-1", // -1 para desactivar
    numberClues:"300", // número de vidas para consumir pistas
    clues:false, // false: sin pistas, true: con pistas
    cluesTime:"8000", // en milisegundos (tiempo en la que se ve la imagen de la solución)

    //Mensaje inicial
    initialMessage:"Bienvenido al Generador de Puzzles. ", // mensaje inicial de bienvenida
    initialMessagePrint:"¡Ánimo!", // mensaje inicial de bienvenida para impresión
    initialImage:"./assets/images/cascada.jpg", // foto inicial de bienvenida

    //Mensaje final
    endMessageSuccess:"Enhorabuena has finalizado el puzzle.", // mensaje de exito
    endMessageFail:"Esa no es la solución.", // mensaje de fallo
    endImageSuccess:"./assets/images/taj_mahal.jpg", // imagen de exito
    endImageFail:"./assets/images/noruega.jpg", // imagen de fallo

    //Solución para mandar a Escapp
    solution:"8132", // 8132 (solución que considera escapp correcta)

    //No tocar
    debug:true,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["es", "en"],
    // locale: "es",
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },

  },
  production:{
    image:"http://lorempixel.com/400/200",
    M:1,
    N:1,
    debug:false,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["en", "es"],
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    n:undefined,
  },
};

(function(){
  let env = process.env.NODE_ENV || 'dev';
  if(typeof GLOBAL_CONFIG[env] === "undefined"){
    env = "dev";
  }
  GLOBAL_CONFIG = GLOBAL_CONFIG[env];

  GLOBAL_CONFIG.debug_scorm_api = ((GLOBAL_CONFIG.debug) && (GLOBAL_CONFIG.debug_scorm_api));
  GLOBAL_CONFIG.debug_scorm_api_window = ((GLOBAL_CONFIG.debug_scorm_api) && (GLOBAL_CONFIG.debug_scorm_api_window));
})();