import React from 'react'
import { formatDateTime, formatTemperature } from '../lib/text'
import { weatherIconMap } from '../lib/icon'

class Weather extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      condition,
      temperature,

      // sensor meteofrance
      sensor,
    } = this.props

    return (
      <div>
        {/* Current weather */}
        <div className="flex items-center justify-end">
          <div className="font-semibold mr-1">
            {formatTemperature(temperature)}
          </div>
          <div className="w-6">
            {weatherIconMap[condition]}
          </div>
        </div>
        {sensor && sensor.hasOwnProperty('weather') && (
          <div className="font-light leading-tight text-right">
            {sensor.weather}
          </div>
        )}
      </div>
    )
  }
}

export default Weather
