const Climate = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_CLIMATE':
      return {
        ...state,
        currentTemperature: action.attributes.current_temperature,
        temperature: action.attributes.temperature,
        minTemperatureAllowed: action.attributes.min_temp,
        maxTemperatureAllowed: action.attributes.max_temp,
        temperatureStep: action.attributes.target_temp_step,
        state: action.attributes.hvac_action,
        batteryPercent: action.attributes.battery_level,
        presetMode: action.attributes.preset_mode,
      }
    default:
      return state
  }
}

export default Climate
