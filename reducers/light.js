const Light = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_LIGHT':
      return {
        ...state,
        [action.id]: {
          state: action.state,
          name: action.attributes.friendly_name,
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
