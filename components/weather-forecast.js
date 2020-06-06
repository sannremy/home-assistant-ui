import React from 'react'
import { formatDateTime, formatTemperature } from '../lib/text'

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
              <div className="font-light">
                {formatDateTime(item.datetime, {
                  weekday: 'short',
                })}
              </div>
              <div>
                <img src={'/weather/' + item.condition + '.svg'} className="p-1" />
              </div>
              <div>{formatTemperature(item.temperature)}</div>
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
