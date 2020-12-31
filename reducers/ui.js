const UI = (state = {
  hasClickedOutside: false,
}, action) => {
  switch (action.type) {
    case 'CLICK_OUTSIDE':
      return {
        ...state,
        hasClickedOutside: action.hasClickedOutside,
      }
    default:
      return state
  }
}

export default UI
