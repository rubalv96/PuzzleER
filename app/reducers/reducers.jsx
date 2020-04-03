import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import trackingReducer from './trackingReducer';
import scormReducer from './scormReducer';
import userProfileReducer from './userProfileReducer';
import waitForUserProfileReducer from './waitForUserProfileReducer';
import piezasReducer from "./piezasReducer";
import seleccionarPiezasReducer from "./seleccionarPiezasReducer";
import puzzleCompletoReducer from "./puzzleCompletoReducer";

const GlobalState = combineReducers({
  loading:loadingReducer,
  tracking:trackingReducer,
  scorm:scormReducer,
  user_profile:userProfileReducer,
  wait_for_user_profile:waitForUserProfileReducer,
  piezas:piezasReducer,
  piezasSeleccionadas:seleccionarPiezasReducer,
  puzzleCompleto:puzzleCompletoReducer,
});

export default GlobalState;