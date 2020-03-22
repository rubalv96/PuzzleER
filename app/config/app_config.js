let GLOBAL_CONFIG_DEVELOPMENT = {
    //Nombre de la prueba
    title: "La fuga de Cleopatra",
    //Imagen de fondo
    imageBackground:"./assets/images/puzzle/egipto_fondo.jpg", // imagen de fondo
    opacityBackground:".3", // opacidad de la imagen

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