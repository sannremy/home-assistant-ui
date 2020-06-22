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
    } = this.props

    let icon = <Car className="w-5 mr-2" />
    if (data.mode === 'transit') {
      icon = <Train className="w-5 mr-1" />
    }

    return (
      <div>
        <div className="font-semibold">{config.name}</div>
        <div className="flex items-center text-sm">
          {icon}
          <div>{data.duration_in_traffic}</div>
        </div>
      </div>
    )
  }
}

export default Travel
