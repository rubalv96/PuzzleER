export let GLOBAL_CONFIG = {
  dev:{
    imageBackground:"./assets/images/diente_leon_t.png",
    opacityBackground:".2",
    image1:"./assets/images/cascada.jpg",
    image2:"./assets/images/cactus.jpg",
    imageExtra1:"./assets/images/egipto.jpg",
    imageExtra2:"./assets/images/noruega.jpg",
    heightImg:"",
    widthImg:"",
    numberAttempts:"10",
    M:4,
    N:2,
    Mextra:3,
    Nextra:2,
    initialMessage:"Bienvenido al Generador de Puzzles. ",
    initialMessagePrint:"¡Ánimo!",
    initialImage:"./assets/images/cascada.jpg",
    endMessageSuccess:"Enhorabuena has finalizado el puzzle.",
    endMessageFail:"Puedes volver a intentarlo.",
    endImageSuccess:"./assets/images/taj_mahal.jpg",
    endImageFail:"./assets/images/noruega.jpg",
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