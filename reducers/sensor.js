import { hasSameValues } from "../lib/object"

let prevState = {}
const Sensor = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SENSOR':
      const newState = {
        ...state,
      }

      const moduleName = action.entityConfig.id
      const metric = action.id.replace(action.entityConfig.metricPattern, '')

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

      if (moduleName && metric) {
        if (newState[moduleName] === undefined) {
          newState[moduleName] = {
            [metric]: value,
          }
        } else {
          newState[moduleName][metric] = value
        }
      }

      // Take only attributes
      if (action.entityConfig.attributesOnly) {
        newState[moduleName][metric] = action.attributes;
        newState[moduleName][metric]['id'] = metric;
      }

      const s = hasSameValues(prevState, newState) ? state : newState
      prevState = s

      return s
    default:
      return state
  }
}

export default Sensor
