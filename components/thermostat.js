import React from 'react'
import { formatTemperature } from '../lib/text'
import { MinusCircle, PlusCircle, Battery, CurrentLocation, SliderAlt } from '@styled-icons/boxicons-regular'
import { setThermostatTemperature } from '../actions'
import { dispatch } from '../lib/store'

class Thermostat extends React.Component {
  state = {
    isHeating: false,
    heatingTemperature: 0,
    enableMinus: false,
    enablePlus: false,
  }

  constructor(props) {
    super(props)

    this.increaseHeatingTemperature = this.increaseHeatingTemperature.bind(this)
    this.decreaseHeatingTemperature = this.decreaseHeatingTemperature.bind(this)
  }

  componentDidMount() {
    const {
      state,
      temperature,
      minTemperatureAllowed,
      maxTemperatureAllowed,
    } = this.props

    const enableMinus = temperature > minTemperatureAllowed
    const enablePlus = temperature < maxTemperatureAllowed

    this.setState({
      isHeating: state === 'heating',
      heatingTemperature: temperature,
      enableMinus,
      enablePlus,
    })
  }

  changeHeatingTemperature(addToCurrent) {
    const {
      heatingTemperature,
    } = this.state

    const {
      minTemperatureAllowed,
      maxTemperatureAllowed,
    } = this.props

    let newTemperature = Math.min(heatingTemperature + addToCurrent, maxTemperatureAllowed)
    newTemperature = Math.max(newTemperature, minTemperatureAllowed)

    const enableMinus = newTemperature > minTemperatureAllowed
    const enablePlus = newTemperature < maxTemperatureAllowed

    this.setState({
      heatingTemperature: newTemperature,
      enableMinus,
      enablePlus,
    })

    dispatch(setThermostatTemperature({
      entity_id: this.props.entityId,
      temperature: newTemperature,
    }))
  }

  increaseHeatingTemperature() {
    this.changeHeatingTemperature(this.props.temperatureStep)
  }

  decreaseHeatingTemperature() {
    this.changeHeatingTemperature(-this.props.temperatureStep)
  }

  render() {
    const {
      temperature,
      currentTemperature,
      batteryPercent,
      presetMode,
    } = this.props

    const {
      isHeating,
      heatingTemperature,
      enableMinus,
      enablePlus,
    } = this.state

    const displayTemperature = heatingTemperature ? heatingTemperature : temperature

    const enableStyle = "cursor-pointer"
    const disableStyle = "opacity-50 cursor-not-allowed"

    return (
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MinusCircle className={`w-5 h-5 mr-2 ${enableMinus ? enableStyle : disableStyle}`} onClick={this.decreaseHeatingTemperature} />
            <div className="w-16 text-center text-xl font-semibold mr-2">
              {formatTemperature(displayTemperature, 1)}
            </div>
            <PlusCircle className={`w-5 h-5 ${enablePlus ? enableStyle : disableStyle}`} onClick={this.increaseHeatingTemperature} />
          </div>
          <div className="text-xl font-semibold">{isHeating ? 'On' : 'Off'}</div>
        </div>

        <ul className="flex items-center text-sm font-light">
          <li className="flex items-center mr-2">
            <CurrentLocation className="w-4 h-4 mr-1" />
            <span>{formatTemperature(currentTemperature, 1)}</span>
          </li>
          <li className="flex items-center mr-2">
            <SliderAlt className="w-4 h-4 mr-1" />
            <span>{presetMode}</span>
          </li>
          <li className="flex items-center mr-2">
            <Battery className="w-4 h-4 mr-1" />
            <span>{batteryPercent} %</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default Thermostat
