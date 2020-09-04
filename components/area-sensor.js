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

    let co2Icon = <Happy className="w-4 h-4 mr-1" />
    if (data.co2 >= 1000) {
      co2Icon = <Meh className="w-4 h-4 mr-1" />
    }

    if (data.co2 >= 2000) {
      co2Icon = <Sad className="w-4 h-4 mr-1" />
    }

    return (
      <div>
        <div className="flex items-center justify-between">
          <div className="font-semibold">{config.name}</div>
          {data && data.hasOwnProperty('temperature') && (
            <div className="text-xl font-semibold">
              {data.temperature === null ? '-' : formatTemperature(data.temperature, 1)}
            </div>
          )}
        </div>
        <ul className="flex items-center text-sm font-light">
          {data && data.hasOwnProperty('co2') && (
            <li className="flex items-center mr-2">
              <span>{data.co2 === null ? '-' : data.co2} ppm</span>
            </li>
          )}
          {data && data.hasOwnProperty('humidity') && (
            <li className="flex items-center mr-2">
              <Droplet className="w-4 h-4 mr-1" />
              <span>{data.humidity === null ? '-' : data.humidity} %</span>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default AreaSensor
