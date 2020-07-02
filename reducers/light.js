import homeConfig from '../home-config.json'

const Light = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_LIGHT':
      const lightConfig = homeConfig.lights[action.id.replace('light.', '')]
      let name = action.attributes.friendly_name
      if (lightConfig && lightConfig.name) {
        name = lightConfig.name
      }

      return {
        ...state,
        [action.id]: {
          entityId: action.id,
          state: action.state,
          name,
          minMireds: action.attributes.min_mireds,
          maxMireds: action.attributes.max_mireds,
          effectList: action.attributes.effect_list,
          brightness: action.attributes.brightness,
          colorTemperature: action.attributes.color_temp,
          effect: action.attributes.effect,
        },
      }
    default:
      return state
  }
}

export default Light
