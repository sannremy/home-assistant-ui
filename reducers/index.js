import { combineReducers } from 'redux'
import SwitchPlug from './switch-plug'
import Climate from './climate'
import Light from './light'
import Sensor from './sensor'
import Timer from './timer'
import Weather from './weather'

export default combineReducers({
  SwitchPlug,
  Climate,
  Light,
  Sensor,
  Timer,
  Weather,
})
