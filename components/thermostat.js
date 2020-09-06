import React from 'react'
import { formatTemperature } from '../lib/text'
import { MinusCircle, PlusCircle, HomeHeart } from '@styled-icons/boxicons-regular'
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
      currentTemperature,
    } = this.props

    const {
      isHeating,
      heatingTemperature,
      enableMinus,
      enablePlus,
    } = this.state

    const enableStyle = "cursor-pointer"
    const disableStyle = "opacity-50 cursor-not-allowed"
    const heatingClass = isHeating ? "bg-yellow-400" : "bg-white"

    return (
      <div>
        <div className={`${heatingClass} flex items-center justify-between px-6 p-3 rounded-full shadow-lg`}>
          <MinusCircle className={`w-6 h-8 transform transition duration-150 ease-in-out ${enableMinus ? enableStyle : disableStyle}`} onClick={this.decreaseHeatingTemperature} />
          <div className="flex items-center">
            <div className="font-semibold">{formatTemperature(heatingTemperature, 1)}</div>
            <div className="text-sm">&nbsp;/&nbsp;{formatTemperature(currentTemperature, 1)}</div>
          </div>
          <PlusCircle className={`w-6 h-6 transform transition duration-150 ease-in-out ${enablePlus ? enableStyle : disableStyle}`} onClick={this.increaseHeatingTemperature} />
        </div>
      </div>
    )
  }
}

export default Thermostat
