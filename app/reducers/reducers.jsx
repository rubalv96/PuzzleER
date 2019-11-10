import {combineReducers} from 'redux';
import trackingReducer from './trackingReducer';
import scormReducer from './scormReducer';
import userProfileReducer from './userProfileReducer';
import waitForUserProfileReducer from './waitForUserProfileReducer';
import piezasReducer from "./piezasReducer";
import seleccionarPiezasReducer from "./seleccionarPiezasReducer";
const GlobalState = combineReducers({
  tracking:trackingReducer,
  scorm:scormReducer,
  user_profile:userProfileReducer,
  wait_for_user_profile:waitForUserProfileReducer,
  piezas: piezasReducer,
  piezasSeleccionadas: seleccionarPiezasReducer,
});

export default GlobalState;