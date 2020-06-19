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
          <div key={index} className={`w-1/${forecast.length} px-2 border-r-2 border-indigo-800 last:border-0`}>
            <div className="flex items-center">
              <div className="font-light">
                {formatDateTime(item.datetime, {
                  weekday: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
            <div className="flex items-center">
              <div>
                {formatTemperature(item.templow)}/{formatTemperature(item.temperature)}
              </div>
              <div className="w-8">
                {weatherIconMap[item.condition]}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default WeatherForecast
