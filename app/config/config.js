let GLOBAL_CONFIG;
let configFilePathDevelopment = './config_development.js';
let configFilePathProduction = './config_production.json';

(function(){
  let configFilePath;
  let env = process.env.NODE_ENV || 'dev';
  if(env === "production"){
    configFilePath = configFilePathProduction;
    GLOBAL_CONFIG = require('./config_production.json');
  } else {
    configFilePath = configFilePathDevelopment;
    GLOBAL_CONFIG = require('./config_development.js');
  }
  // GLOBAL_CONFIG = require(configFilePath); //Do not work with webpack

  if((configFilePath === configFilePathDevelopment)&&(GLOBAL_CONFIG.test_production_file===true)&&(env != "dev_crop")){
    GLOBAL_CONFIG = require('./config_production.json');
  }
  
  GLOBAL_CONFIG.debug_scorm_api = ((GLOBAL_CONFIG.debug) && (GLOBAL_CONFIG.debug_scorm_api));
  GLOBAL_CONFIG.debug_scorm_api_window = ((GLOBAL_CONFIG.debug_scorm_api) && (GLOBAL_CONFIG.debug_scorm_api_window));
})();

module.exports = GLOBAL_CONFIG;