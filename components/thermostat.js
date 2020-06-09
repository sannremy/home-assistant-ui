import React from 'react'
import { formatTemperature } from '../lib/text'
import { MinusCircle, PlusCircle } from '@styled-icons/boxicons-regular'

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
        <div className="flex items-center justify-end">
          <div className="w-5 mr-1">
            <MinusCircle />
          </div>
          {formatTemperature(temperature)} ({formatTemperature(currentTemperature)})
          <div className="w-5 ml-1">
            <PlusCircle />
          </div>
        </div>
        <div>
          {state}
        </div>
      </div>
    )
  }
}

export default Thermostat
