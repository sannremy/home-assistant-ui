import React from 'react'
import { formatDateTime, formatTemperature } from '../lib/text'
import { weatherIconMap } from '../lib/icon'

class WeatherForecast extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      forecast,
    } = this.props

    return (
      <div className="flex items-center">
        {forecast && forecast.map((item, index) => (
          <div key={index} className={`w-20 px-2 text-center`}>
            <div className="font-light">
              {formatDateTime(item.datetime, {
                weekday: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="w-8 mx-auto">
              {weatherIconMap[item.condition]}
            </div>
            <div>
              <span className="mr-2">
                {formatTemperature(item.temperature)}
              </span>
              <span className="text-indigo-400">
                {formatTemperature(item.templow)}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default WeatherForecast
