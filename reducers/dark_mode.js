const DarkMode = (state = {
  enabled: (
    typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}, action
) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        enabled: !state.enabled,
      }
    default:
      return state
  }
}

export default DarkMode
