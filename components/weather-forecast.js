import React from 'react'
import { formatDateTime } from '../lib/text'
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
      <div className="flex">
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
                <div>{item.templow}</div>
                <div className="text-gray-400">｜</div>
                <div>{item.temperature}</div>
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
