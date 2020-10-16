import homeConfig from '../home-config.json'

const Timer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_TIMER':
      const id = action.id.replace('timer.', '')
      const timerConfig = homeConfig.timers[id]
      let name = id
      if (timerConfig && timerConfig.name) {
        name = timerConfig.name
      }

      return {
        ...state,
        [id]: {
          entityId: action.id,
          status: action.state,
          duration: action.attributes.duration,
          finishesAt: action.attributes.finishes_at ? action.attributes.finishes_at : null,
          name,
        },
      }
    default:
      return state
  }
}

export default Timer
