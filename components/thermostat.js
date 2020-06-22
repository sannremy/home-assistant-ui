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

    let backgroundColor = ''
    if (isHeating) {
      backgroundColor = 'bg-yellow-400'
    }

    return (
      <div className={`${backgroundColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MinusCircle className="w-5 h-5 mr-2 cursor-pointer" />
            <div className="text-xl font-semibold mr-2">
              {formatTemperature(temperature, true)}
            </div>
            <PlusCircle className="w-5 h-5 cursor-pointer" />
          </div>
          <div>On/off</div>
        </div>

        <ul className="flex items-center text-sm font-light">
          <li className="flex items-center mr-2">
            <span>{formatTemperature(currentTemperature, true)}</span>
          </li>
          <li className="flex items-center mr-2">
            <span>{presetMode}</span>
          </li>
          <li className="flex items-center mr-2">
            <span>{batteryPercent} %</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default Thermostat
