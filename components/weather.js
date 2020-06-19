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
        <div className="flex items-center">
          <div className="text-2xl font-semibold mr-1">
            {formatTemperature(temperature)}
          </div>
          <div className="w-8 h-8">
            {weatherIconMap[condition]}
          </div>
        </div>
        {sensor && sensor.hasOwnProperty('weather') && (
          <div className="font-light leading-tight">
            {sensor.weather}
          </div>
        )}
      </div>
    )
  }
}

export default Weather
