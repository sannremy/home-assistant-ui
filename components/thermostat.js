import React from 'react'
import { formatTemperature } from '../lib/text'

class Thermostat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      currentTemperature,
      temperature,
      state,
      batteryPercent,
      presetMode,
    } = this.props

    return (
      <div>
        <div>
          - {formatTemperature(temperature)} ({formatTemperature(currentTemperature)}) +
        </div>
        <div>
          {state}
        </div>
      </div>
    )
  }
}

export default Thermostat
