/**
 * Receive HA result (success or error)
 */
const receiveSuccessResult = (result) => {
  return dispatch => {
    for (let i = 0; i < result.length; i++) {
      if (result[i].entity_id === 'weather.openweathermap') {
        return dispatch(updateWeather(result[i]))
      }
    }
  }
}

const updateWeather = ({ state, attributes }) => ({
  type: 'UPDATE_WEATHER',
  state,
  attributes,
})

const receiveErrorResult = (error) => ({
  type: 'RECEIVE_ERROR_RESULT',
  error,
})

export const receiveResult = (response) => {
  return dispatch => {
    if (response.success) {
      return dispatch(receiveSuccessResult(response.result))
    } else {
      return dispatch(receiveErrorResult(response.error))
    }
  }
}
