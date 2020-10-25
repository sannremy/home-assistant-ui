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
          entityId: action.id,
          state: action.state,
          name,
          effectList: action.attributes.effect_list,
          brightness: action.attributes.brightness,
          colorTemperature: action.attributes.color_temp,
          effect: action.attributes.effect,
          effectList: action.attributes.effect_list,
          rgbColor: action.attributes.rgb_color,
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
