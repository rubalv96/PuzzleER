export let GLOBAL_CONFIG = {
  dev:{
    image1:"./assets/images/egipto.jpg",
    image2:"./assets/images/noruega.jpg",
    imageExtra1: "./assets/images/cactus.jpg",
    imageExtra2: "./assets/images/taj_mahal.jpg",
    heightImg:"",
    widthImg:"",
    M:2,
    N:2,
    Mextra: 0,
    Nextra: 0,
    initialMessage: "",
    initialImage:"",
    endMessage:"Enhorabuena has finalizado el puzzle.",
    endImage:"",
    debug:true,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["en", "es"],
    // locale: "es",
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    n:3,

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
