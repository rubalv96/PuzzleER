let GLOBAL_CONFIG_DEVELOPMENT = {

  // Nombre de la prueba
  title:"Anatomía ocular",
  // Imagen de fondo
  //imageBackground:"./assets/images/egipto_pintura.jpg", // imagen de fondo
  opacityBackground:"0.3", // opacidad de la imagen (por defecto sin opacidad)

  // Sonidos (por defecto, no hay música)
  // backgroundMusic:"./assets/sounds/backgroundMusic.mp3", // https://www.fesliyanstudios.com/royalty-free-music/downloads-c/mysterious-music/7
  // successMusic:"./assets/sounds/successMusic.mp3", // http://soundbible.com/1003-Ta-Da.html
  // failureMusic:"./assets/sounds/failureMusic.mp3", // http://soundbible.com/1830-Sad-Trombone.html
  // volume:1, // Volumen de 0 a 1 (defecto 1)

  // Dimensiones del puzzle
  M:5, // numero de columnas del puzzle (requerido)
  N:1, // numero de filas del puzzle (requerido)
  fake_pieces:2,

  // Reverse mode (defecto -> false)
  reverseMode:false,

  // Timer
  //time:"210", // tiempo en segundos para resolver el puzzle

  // Zoom
  //zoomMode:true, // activar modo zoom
  //zoomFactor:5, // factor de ampliación

  // Tiempo mínimo exigido para leer instrucciones (en segundos)
  timeToReadInstructions:10,

  // Mensaje inicial
  initialMessage:"¿Serás capaz de resolver los misterios de la anatomía ocular?", // mensaje inicial de bienvenida
  initialMessagePrint:"(mensaje configurable por el autor del recurso)", // mensaje inicial de bienvenida para impresión
  // initialImage:"./assets/images/egipto_inicial.svg", // foto inicial de bienvenida

  // Mensaje final
  endMessageSuccess:"¡Has dado con la solución!", // mensaje de exito
  endMessageFail:"Parece que eso no nos sirve para seguir investigando los misterios de la anatomía ocular.", // mensaje de fallo
  // endImageSuccess:"./assets/images/egipto_inicial.svg", // imagen de exito
  // endImageFail:"./assets/images/egipto_fallo.png", // imagen de fallo

  // Escapp configuraciones
  escapp:{
    endpoint:"https://escapp.dit.upm.es/api/escapeRooms/10",
    localStorageKey:"ESCAPP_Puzzle",
    imagesPath:"assets/images/",
    I18n:{
      availableLocales:["es", "en"],
      locale:"es",
      defaultLocale:"es",
    },
    appPuzzleIds:[5],
    forceValidation:false,
  },

  // No tocar
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
};

module.exports = GLOBAL_CONFIG_DEVELOPMENT;
