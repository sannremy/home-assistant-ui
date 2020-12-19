import homeConfig from '../home-config.json'
import { hasSameValues } from '../lib/object'

let prevState = {}
const Light = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_LIGHT':
      const lightConfig = homeConfig.lights[action.id.replace('light.', '')]
      let name = action.attributes.friendly_name
      if (lightConfig && lightConfig.name) {
        name = lightConfig.name
      }

      const newState = {
        ...state,
        [action.id]: {
          ...action.attributes,
          entityId: action.id,
          state: action.state,
          name,
        },
      }

      const s = hasSameValues(prevState, newState) ? state : newState
      prevState = s

      return s
    default:
      return state
  }
}

export default Light
