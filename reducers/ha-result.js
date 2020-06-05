const HAResult = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_SUCCESS_RESULT':
      return {
        ...state,
        result: action.result,
      }
    case 'RECEIVE_ERROR_RESULT':
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default HAResult
