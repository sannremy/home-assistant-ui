import { combineReducers } from 'redux'
import HAResult from './ha-result'
import SwitchPlug from './switch-plug'
import Climate from './climate'
import Sensor from './sensor'
import Weather from './weather'

export default combineReducers({
  HAResult,
  SwitchPlug,
  Climate,
  Sensor,
  Weather,
})
