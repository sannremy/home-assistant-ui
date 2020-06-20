import React from 'react'
import { formatTemperature } from '../lib/text'
import { MinusCircle, PlusCircle, Battery, Slider } from '@styled-icons/boxicons-regular'

class Thermostat extends React.Component {
  state = {
    isHeating: false,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.setState({
      isHeating: this.props.state === 'heating',
    })
  }

  render() {
    const {
      currentTemperature,
      temperature,
      batteryPercent,
      presetMode,
    } = this.props

    const {
      isHeating,
    } = this.state

    let backgroundColor = 'bg-white'
    if (isHeating) {
      backgroundColor = 'bg-yellow-400'
    }

    return (
      <div className="flex items-center">
        <div className={`flex items-center ${backgroundColor} rounded-lg py-2 mr-2`}>
          <div className="flex items-center px-4 py-2">
            <MinusCircle className="w-5" />
          </div>
          <div className="text-2xl font-semibold">
            {formatTemperature(temperature, true)}
          </div>
          <div className="flex items-center px-4 py-2">
            <PlusCircle className="w-5" />
          </div>
        </div>
        <div className="text-xs inline-flex items-center border border-indigo-900 rounded-full px-2 py-1 mr-2">
          <Slider className="w-3 h-3 mr-1" />
          <span>{presetMode}</span>
        </div>
        <div className="text-xs inline-flex items-center border border-indigo-900 rounded-full px-2 py-1">
          <Battery className="w-3 h-3 mr-1" />
          <span>{batteryPercent} %</span>
        </div>
      </div>
    )
  }
}

export default Thermostat
