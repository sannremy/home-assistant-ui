import React from 'react'
import { formatDateTime, formatTemperature } from '../lib/text'
import { weatherIconMap } from '../lib/icon'

class WeatherForecast extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      condition,
      temperature,
      nextRain,
      wind,
      forecast,

      // sensor meteofrance
      sensor,
    } = this.props

    return (
      <div className="flex">
        {/* Current weather */}
        <div>
          <div className="flex items-center">
            <div className="text-3xl">
              {formatTemperature(temperature)}
            </div>
            <div>
              {weatherIconMap[condition]}
            </div>
          </div>
          {sensor && sensor.hasOwnProperty('weather') && (
            <div>{sensor.weather}</div>
          )}
        </div>

        {/* Forecast */}
        {forecast && forecast.map((item, index) => (
          <div key={index} className="w-1/5 px-2">
            <div className="text-center">
              <div>
                {formatDateTime(item.datetime, {
                  weekday: 'short',
                })}
              </div>
              <div className="flex items-center justify-center">
                <div className="w-10 my-2">
                  {weatherIconMap[item.condition]}
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <div>{formatTemperature(item.templow)}</div>
                <div className="text-gray-400">｜</div>
                <div>{formatTemperature(item.temperature)}</div>
              </div>
              {item.precipitation && (
                <div className="text-xs">{item.precipitation} mm</div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default WeatherForecast
