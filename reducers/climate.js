const Climate = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_CLIMATE':
      return {
        ...state,
        // "hvac_modes": [
        //   "auto",
        //   "heat",
        //   "off"
        // ],
        // "min_temp": 7,
        // "max_temp": 35,
        // "target_temp_step": 0.5,
        // "preset_modes": [
        //   "away",
        //   "boost",
        //   "Frost Guard",
        //   "Schedule"
        // ],
        // "current_temperature": 23.4,
        // "temperature": 19,
        // "hvac_action": "idle",
        // "preset_mode": "Schedule",
        // "battery_level": 94,
        // "friendly_name": "Netatmo Salon",
        // "supported_features": 17
      }
    default:
      return state
  }
}

export default Climate
