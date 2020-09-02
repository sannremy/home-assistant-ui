const Weather = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_WEATHER':
      return {
        ...state,
        condition: action.state,
        temperature: action.attributes.temperature,
        nextRain: action.attributes.next_rain,
        wind: {
          bearing: action.attributes.wind_bearing,
          speed: action.attributes.wind_speed,
        },
        forecast: action.attributes.forecast.slice(0, 5).map(item => {
          // Format date as object
          item.datetime = new Date(item.datetime)

          return item
        }),
      }
    default:
      return state
  }
}

export default Weather
