const Sensor = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SENSOR':
      const newState = {
        ...state,
      }

      // Cast and format values
      let value = action.state

      if (value === 'unavailable') { // Netatmo
        value = null
      } else if (value === 'True') { // Netatmo
        value = true
      } else if (value === 'False') { // Netatmo
        value = false
      } else if (/^\-?\d+$/.test(value)) {
        value = parseInt(value, 10)
      } else if (/^\-?[\d.]+$/.test(value)) {
        value = parseFloat(value, 10)
      }

      if (action.moduleName && action.metric) {
        if (newState[action.moduleName] === undefined) {
          newState[action.moduleName] = {
            [action.metric]: value,
          }
        } else {
          newState[action.moduleName][action.metric] = value
        }
      }

      // Google travel time
      if (action.moduleName === 'googleTravelTime') {
        newState[action.moduleName][action.metric] = action.attributes;
        newState[action.moduleName][action.metric]['id'] = action.metric;
      }

      return newState
    default:
      return state
  }
}

export default Sensor
