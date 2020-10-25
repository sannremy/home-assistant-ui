const Navbar = (state = {
  view: 'home',
}, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW':
      return {
        ...state,
        view: action.view,
      }
    default:
      return state
  }
}

export default Navbar
