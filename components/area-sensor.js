import React from 'react'
import { formatTemperature } from '../lib/text'
import { Droplet, DialpadAlt, NetworkChart } from '@styled-icons/boxicons-regular'

class AreaSensor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      data,
      config,
    } = this.props

    const isOutside = config.location === 'outside'
    const bgTemperature = isOutside ? 'bg-green-100' : 'bg-indigo-100'

    return (
      <div className="flex items-center">
        <div className={`${bgTemperature} font-semibold p-2 rounded-full mr-2`}>
          {data && data.hasOwnProperty('temperature') && (
            <span className="">
              {data.temperature === null ? '-' : formatTemperature(data.temperature, 1)}
            </span>
          )}
        </div>
        <div className="">
          <div className="">{config.name}</div>
          <ul className="flex items-center text-sm">
            {data && data.hasOwnProperty('co2') && (
              <li className="flex items-center mr-2">
                <NetworkChart className="w-4 h-4 mr-1" />
                <span>{data.co2 === null ? '-' : data.co2}<span className="text-xs"> ppm</span></span>
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
      </div>
    )
  }
}

export default AreaSensor
