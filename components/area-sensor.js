import React from 'react'
import { formatTemperature } from '../lib/text'
import { Droplet, Battery, Meh, Happy, Sad } from '@styled-icons/boxicons-regular'

class AreaSensor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      data,
      config,
    } = this.props

    let co2Icon = <Happy className="w-3 h-3 mr-1" />
    if (data.co2 >= 1000) {
      co2Icon = <Meh className="w-3 h-3 mr-1" />
    }

    if (data.co2 >= 2000) {
      co2Icon = <Sad className="w-3 h-3 mr-1" />
    }

    return (
      <div>
        <div className="flex items-center justify-between">
          <div className="font-semibold">{config.name}</div>
          {data && data.hasOwnProperty('temperature') && (
            <div className="text-xl font-semibold">
              {data.temperature === null ? '-' : formatTemperature(data.temperature)}
            </div>
          )}
        </div>
        <ul className="flex items-center text-xs font-light">
          {data && data.hasOwnProperty('co2') && (
            <li className="flex items-center mr-2 border border-indigo-900 rounded-full px-2 py-1">
              {co2Icon}
              <span>{data.co2 === null ? '-' : data.co2} ppm</span>
            </li>
          )}
          {data && data.hasOwnProperty('humidity') && (
            <li className="flex items-center mr-2 border border-indigo-900 rounded-full px-2 py-1">
              <Droplet className="w-3 h-3 mr-1" />
              <span>{data.humidity === null ? '-' : data.humidity} %</span>
            </li>
          )}
          {data && data.hasOwnProperty('battery_percent') && (
            <li className="flex items-center mr-2 border border-indigo-900 rounded-full px-2 py-1">
              <Battery className="w-3 h-3 mr-1" />
              <span>{data.battery_percent === null ? '-' : data.battery_percent} %</span>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default AreaSensor
