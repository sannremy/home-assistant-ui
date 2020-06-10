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
      <div className="flex items-center">
        <div className="w-5 mr-1">
          <MinusCircle />
        </div>
        {formatTemperature(temperature)}
        <div className="w-5 ml-1">
          <PlusCircle />
        </div>
      </div>
    )
  }
}

export default Thermostat
