import homeConfig from '../home-config.json'

const SwitchPlug = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SWITCH_PLUG':
      const switchPlugConfig = homeConfig.switchPlugs[action.id.replace('switch.', '')]
      let name = action.attributes.friendly_name
      if (switchPlugConfig && switchPlugConfig.name) {
        name = switchPlugConfig.name
      }

      return {
        ...state,
        [action.id]: {
          entityId: action.id,
          state: action.state,
          name,
        },
      }
    default:
      return state
  }
}

export default SwitchPlug
