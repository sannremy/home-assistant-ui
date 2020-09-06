import React from 'react'
import { Car, Train } from '@styled-icons/boxicons-regular'
import { formatTrainStationName } from '../lib/text'

class Travel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      config,
      data,
      mode,
    } = this.props

    const iconClassName = "w-1/6 mr-3 rounded-full bg-indigo-100 p-2"

    let icon = <Car className={iconClassName} />
    let time = null
    let name = '?'

    if (mode === 'car') {
      time = data.duration_in_traffic
      name = config.name
    } else if (mode === 'train') {
      icon = <Train className={iconClassName} />
      name = formatTrainStationName(data.destinationMission)
      time = data.departureTime
    }

    return (
      <div className="flex items-start">
        {icon}
        <div className="w-5/6">
          <div className="">{time}</div>
          <div className="text-sm">{name}</div>
        </div>
      </div>
    )
  }
}

export default Travel
