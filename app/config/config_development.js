let GLOBAL_CONFIG_DEVELOPMENT = {
    test_production_file: false,

    //Nombre de la prueba
    title: "La fuga de Cleopatra",
    //Imagen de fondo
    imageBackground:"./assets/images/puzzle/egipto_fondo.jpg", // imagen de fondo
    opacityBackground:".3", // opacidad de la imagen

    //Imagenes de las piezas
    image1:"./assets/images/puzzle/egipto_pintura.jpg", // imagen solución
    image2:"./assets/images/puzzle/egipto_ank.jpg", // imagen solución reverso
    imageExtra1:"./assets/images/puzzle/egipto_altamira.jpg", // imagen señuelo cara
    imageExtra2:"./assets/images/puzzle/egipto_fatima.jpg", // imagen señuelo reverso

    //Datos generados por npm run crop
   "solution":"9b3632edf4a55e02f212305f87e953ca",
   "images":[
      {
         "id":"23163",
         "path":"./assets/images/crop/23163.jpg"
      },
      {
         "id":"97040",
         "path":"./assets/images/crop/97040.jpg"
      },
      {
         "id":"96011",
         "path":"./assets/images/crop/96011.jpg"
      },
      {
         "id":"47849",
         "path":"./assets/images/crop/47849.jpg"
      },
      {
         "id":"96119",
         "path":"./assets/images/crop/96119.jpg"
      },
      {
         "id":"59800",
         "path":"./assets/images/crop/59800.jpg"
      },
      {
         "id":"98778",
         "path":"./assets/images/crop/98778.jpg"
      },
      {
         "id":"91594",
         "path":"./assets/images/crop/91594.jpg"
      },
      {
         "id":"18414",
         "path":"./assets/images/crop/18414.jpg"
      },
      {
         "id":"27980",
         "path":"./assets/images/crop/27980.jpg"
      },
      {
         "id":"54830",
         "path":"./assets/images/crop/54830.jpg"
      },
      {
         "id":"20088",
         "path":"./assets/images/crop/20088.jpg"
      },
      {
         "id":"12299",
         "path":"./assets/images/crop/12299.jpg"
      },
      {
         "id":"54953",
         "path":"./assets/images/crop/54953.jpg"
      },
      {
         "id":"65903",
         "path":"./assets/images/crop/65903.jpg"
      },
      {
         "id":"65500",
         "path":"./assets/images/crop/65500.jpg"
      },
      {
         "id":"71442",
         "path":"./assets/images/crop/71442.jpg"
      },
      {
         "id":"41868",
         "path":"./assets/images/crop/41868.jpg"
      },
      {
         "id":"31762",
         "path":"./assets/images/crop/31762.jpg"
      },
      {
         "id":"88523",
         "path":"./assets/images/crop/88523.jpg"
      },
      {
         "id":"70563",
         "path":"./assets/images/crop/70563.jpg"
      },
      {
         "id":"37444",
         "path":"./assets/images/crop/37444.jpg"
      },
      {
         "id":"88644",
         "path":"./assets/images/crop/88644.jpg"
      },
      {
         "id":"35510",
         "path":"./assets/images/crop/35510.jpg"
      }
   ],


    //Sonidos
    // backgroundMusic: "./assets/images/puzzle/egipto_musica.mp3",

    //Dimensiones del puzzle
    M:4, // numero de columnas del puzzle
    N:4, // numero de filas del puzzle
    Mextra:2, // numero de columnas del area de piezas sobrantes
    Nextra:2, // número de filas del área de piezas sobrantes

    //Timer
    time:"210", // tiempo en segundos para resolver el puzzle

    //Cuadro de puzzle
    heightImg:"", // tamaño altura cuadro de puzzles(tiene valor por defecto si se deja vacío)
    widthImg:"", // tamaño anchura de cuadro de puzzles(tiene valor por defecto si se deja vacío)

    //Modo juego independiente (falta matizar detalles)
    numberAttempts:"-1", // número de intentos de comprobación (-1 para desactivar)
    numberClues:"35", // número de vidas para consumir pistas
    clues:false, // false: sin pistas, true: con pistas
    cluesTime:"8000", // en milisegundos (tiempo en la que se ve la imagen de la solución)

    //Mensaje inicial
    initialMessage:"El Antiguo Egipto está repleto de misterios. Las actividades cotidianas, las creencias, las leyendas y las vivencias son reflejados en el arte egipcio y esconde grandes incógnitas. Nos hemos adentrado en la residencia de Cleopatra y hemos encontrado un conjunto de piezas que pueden esconder un gran secreto. Los soldados han ido a buscar agua al Nilo para el baño diario de la faraona y tenemos 3 minutos y medio antes de que lleguen a los aposentos de Cleopatra. ¿Nos ayudas a resolverlo?", // mensaje inicial de bienvenida
    initialMessagePrint:"(mensaje configurable por el autor del recurso)", // mensaje inicial de bienvenida para impresión
    initialImage:"./assets/images/puzzle/egipto_inicial.svg", // foto inicial de bienvenida

    //Mensaje final
    endMessageSuccess:"Has dado con uno de los papiros más importantes del Antiguo Egipto así como el símbolo del Ankh, el símbolo egipcio de la vida. Estamos más cerca de averiguar las grandes incógnitas de Cleopatra. ¡Enhorabuena!", // mensaje de exito
    endMessageFail:"Parece que eso no nos sirve para seguir investigando los misterios de Egipto.", // mensaje de fallo
    endImageSuccess:"./assets/images/puzzle/egipto_pintura.jpg", // imagen de exito
    endImageFail:"", // imagen de fallo

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
    }
};

module.exports = GLOBAL_CONFIG_DEVELOPMENT;