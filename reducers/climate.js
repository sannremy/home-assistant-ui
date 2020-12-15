import { hasSameValues } from "../lib/object"

let prevState = {}
const Climate = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_CLIMATE':
      const newState = {
        ...state,
        ...action.attributes,
        entityId: action.id,
      }

      const s = hasSameValues(prevState, newState) ? state : newState
      prevState = s

      return s
    default:
      return state
  }
}

export default Climate
