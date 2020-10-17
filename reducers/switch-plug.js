import homeConfig from '../home-config.json'
import { hasSameValues } from '../lib/object'

let prevState = {}
const SwitchPlug = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SWITCH_PLUG':
      const switchPlugConfig = homeConfig.switchPlugs[action.id.replace('switch.', '')]
      let name = action.attributes.friendly_name
      if (switchPlugConfig && switchPlugConfig.name) {
        name = switchPlugConfig.name
      }

      const newState = {
        ...state,
        [action.id]: {
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

export default SwitchPlug
