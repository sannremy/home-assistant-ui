import { hasSameValues } from '../lib/object'

let prevState = {}

const dateAttributes = [
  "next_dawn",
  "next_dusk",
  "next_midnight",
  "next_noon",
  "next_rising",
  "next_setting",
]

const Sun = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SUN':
      const newState = {
        ...state,
        state: action.state,
        ...action.attributes,
      }

      // String to Date
      for (let i = 0; i < dateAttributes.length; i++) {
        newState[dateAttributes[i]] = Date.parse(newState[dateAttributes[i]]);
      }

      const s = hasSameValues(prevState, newState) ? state : newState
      prevState = s

      return s
    default:
      return state
  }
}

export default Sun
