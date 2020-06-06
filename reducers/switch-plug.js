const SwitchPlug = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SWITCH_PLUG':
      return {
        ...state,
        [action.id]: {
          state: action.state,
          name: action.attributes.friendly_name,
        },
      }
    default:
      return state
  }
}

export default SwitchPlug
