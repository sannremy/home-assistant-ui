import { hasSameValues } from "../lib/object"

let prevState = {}
const Climate = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_CLIMATE':
      const newState = {
        ...state,
        entityId: action.id,
        currentTemperature: action.attributes.current_temperature,
        temperature: action.attributes.temperature,
        minTemperatureAllowed: action.attributes.min_temp,
        maxTemperatureAllowed: action.attributes.max_temp,
        temperatureStep: action.attributes.target_temp_step,
        state: action.attributes.hvac_action,
        batteryPercent: action.attributes.battery_level,
        presetMode: action.attributes.preset_mode,
      }

      const s = hasSameValues(prevState, newState) ? state : newState
      prevState = s

      return s
    default:
      return state
  }
}

export default Climate
