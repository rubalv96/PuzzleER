let GLOBAL_CONFIG = require('./app_config.js');
let DATA_CROP = require('./data_generated_by_crop.json');

(function(){
  // Include crop data
  GLOBAL_CONFIG.pieces = DATA_CROP.pieces;
  GLOBAL_CONFIG.solution = DATA_CROP.solution;

  GLOBAL_CONFIG.debug_scorm_api = ((GLOBAL_CONFIG.debug) && (GLOBAL_CONFIG.debug_scorm_api));
  GLOBAL_CONFIG.debug_scorm_api_window = ((GLOBAL_CONFIG.debug_scorm_api) && (GLOBAL_CONFIG.debug_scorm_api_window));
})();

module.exports = GLOBAL_CONFIG;