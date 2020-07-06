import React from 'react'
import { Car, Train } from '@styled-icons/boxicons-regular'

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

    let icon = <Car className="w-5 mr-2" />
    let time = null
    let name = '?'

    if (mode === 'car') {
      time = data.duration_in_traffic
      name = config.name
    } else if (mode === 'train') {
      icon = <Train className="w-5 mr-1" />
      name = data.destinationMission
      time = data.departureTime
    }

    return (
      <div>
        <div className="font-semibold">{name}</div>
        <div className="flex items-center text-sm">
          {icon}
          <div>{time}</div>
        </div>
      </div>
    )
  }
}

export default Travel
