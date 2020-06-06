const Sensor = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SENSOR':
      const newState = {
        ...state,
      }

      // Cast and format values
      let value = action.state
      if (value === 'True') {
        value = true
      } else if (value === 'False') {
        value = false
      } else if (/^\-?\d+$/.test(value)) {
        value = parseInt(value, 10)
      } else if (/^\-?[\d.]+$/.test(value)) {
        value = parseFloat(value, 10)
      }

      if (action.moduleName && newState[action.moduleName] === undefined) {
        newState[action.moduleName] = {
          [action.metric]: value
        }
      } else {
        newState[action.moduleName][action.metric] = value
      }

      return newState
    default:
      return state
  }
}

export default Sensor
