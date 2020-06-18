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
        {/* Forecast */}
        {forecast && forecast.map((item, index) => (
          <div key={index} className={`w-1/${forecast.length} px-2 border-r-2 border-gray-200 last:border-0`}>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-6 h-6">
                  {weatherIconMap[item.condition]}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-gray-500 mr-2">
                  {formatTemperature(item.templow)}
                </div>
                <div>
                {formatTemperature(item.temperature)}
                </div>
              </div>
              <div className="font-light">
                {formatDateTime(item.datetime, {
                  weekday: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default WeatherForecast
