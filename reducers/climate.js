const Climate = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_CLIMATE':
      return {
        ...state,
        currentTemperature: action.attributes.current_temperature,
        temperature: action.attributes.temperature,
        state: action.attributes.hvac_action,
        batteryPercent: action.attributes.battery_level,
        presetMode: action.attributes.preset_mode,
      }
    default:
      return state
  }
}

export default Climate
