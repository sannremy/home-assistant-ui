import homeConfig from '../home-config.json'
import { hasSameValues } from '../lib/object'

let prevState = {}
const Timer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_TIMER':
      const id = action.id.replace('timer.', '')
      const timerConfig = homeConfig.timers[id]
      let name = id
      if (timerConfig && timerConfig.name) {
        name = timerConfig.name
      }

      const newState = {
        ...state,
        [id]: {
          entityId: action.id,
          status: action.state,
          duration: action.attributes.duration,
          finishesAt: action.attributes.finishes_at ? action.attributes.finishes_at : null,
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

export default Timer
