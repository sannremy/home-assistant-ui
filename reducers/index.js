import { combineReducers } from 'redux'
import SwitchPlug from './switch-plug'
import Climate from './climate'
import Light from './light'
import Sensor from './sensor'
import Timer from './timer'
import Weather from './weather'
import Navbar from './navbar'
import UI from './ui'
import Sun from './sun'

export default combineReducers({
  SwitchPlug,
  Climate,
  Light,
  Sensor,
  Timer,
  Weather,
  Navbar,
  UI,
  Sun,
})
