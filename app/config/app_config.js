let GLOBAL_CONFIG_DEVELOPMENT = {

  // Nombre de la prueba
  title:"El misterio de Cleopatra",
  // Imagen de fondo
  imageBackground:"./assets/images/puzzle/egipto_fondo.jpg", // imagen de fondo
  opacityBackground:"0.3", // opacidad de la imagen (por defecto sin opacidad)

  // Sonidos (por defecto, no hay música)
  backgroundMusic:"./assets/sounds/backgroundMusic.mp3", // https://www.fesliyanstudios.com/royalty-free-music/downloads-c/mysterious-music/7
  successMusic:"./assets/sounds/successMusic.mp3", // http://soundbible.com/1003-Ta-Da.html
  failureMusic:"./assets/sounds/failureMusic.mp3", // http://soundbible.com/1830-Sad-Trombone.html
  volume:1, // Volumen de 0 a 1 (defecto 1)

  // Dimensiones del puzzle
  M:6, // numero de columnas del puzzle (requerido)
  N:2, // numero de filas del puzzle (requerido)
  // Mextra:4, // numero de columnas del area de piezas sobrantes (defecto 0)
  // Nextra:2, // número de filas del área de piezas sobrantes (defecto 0)

  // Reverse mode (defecto -> false)
  reverseMode:true,

  // Timer
  time:"220", // tiempo en segundos para resolver el puzzle

  // Cuadro de puzzle
  heightFrame:"", // tamaño altura cuadro de puzzles(tiene valor por defecto si se deja vacío)
  widthFrame:"", // tamaño anchura de cuadro de puzzles(tiene valor por defecto si se deja vacío)

  // Zoom
  zoomMode:true, // activar modo zoom
  zoomFactor:2, // factor de ampliación

  // Tiempo mínimo exigido para leer instrucciones (en segundos)
  timeToReadInstructions:1,

  // Mensaje inicial
  initialMessage:"El Antiguo Egipto está repleto de misterios. Las actividades cotidianas, las creencias, las leyendas y las vivencias son reflejados en el arte egipcio y esconde grandes incógnitas. Nos hemos adentrado en la residencia de Cleopatra y hemos encontrado un conjunto de piezas que pueden esconder un gran secreto. Los soldados han ido a buscar agua al Nilo para el baño diario de la faraona y tenemos 3 minutos y medio antes de que lleguen a los aposentos de Cleopatra. ¿Nos ayudas a resolverlo?", // mensaje inicial de bienvenida
  initialMessagePrint:"(mensaje configurable por el autor del recurso)", // mensaje inicial de bienvenida para impresión
  initialImage:"./assets/images/puzzle/egipto_inicial.svg", // foto inicial de bienvenida

  // Mensaje final
  endMessageSuccess:"Has dado con uno de los papiros más importantes del Antiguo Egipto así como el símbolo del Ankh, el símbolo egipcio de la vida. Estamos más cerca de averiguar las grandes incógnitas de Cleopatra. ¡Enhorabuena!", // mensaje de exito
  endMessageFail:"Parece que eso no nos sirve para seguir investigando los misterios de Egipto.", // mensaje de fallo
  endImageSuccess:"./assets/images/puzzle/egipto_inicial.svg", // imagen de exito
  endImageFail:"./assets/images/puzzle/egipto_fallo.png", // imagen de fallo

  // Escapp configuraciones
  escapeRoomId:1,
  puzzleId:5,

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