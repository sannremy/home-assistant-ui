const Weather = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_WEATHER':
      return {
        ...state,
        condition: action.state,
        temperature: action.attributes.temperature,
        humidity: action.attributes.humidity,
        pressure: action.attributes.pressure,
        wind: {
          bearing: action.attributes.wind_bearing,
          speed: action.attributes.wind_speed,
        },
        forecast: action.attributes.forecast.map(item => {
          // Format date as object
          const date = new Date()
          date.setTime(item.datetime)
          item.datetime = date

          return item
        }),
      }
    default:
      return state
  }
}

export default Weather
