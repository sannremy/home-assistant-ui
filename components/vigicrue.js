import React from 'react'
import { formatDateTime, formatNumber } from '../lib/text'
import { Circle } from '@styled-icons/boxicons-solid'
import { Water } from '@styled-icons/boxicons-regular'

class Vigicrue extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      level,
      date,
    } = this.props

    return (
      <div className="flex items-center">
        <div className="mr-1">
          <Water className="w-8 h-8" />
        </div>
        <div className="mr-2">
          <Circle className="w-4 h-4 text-green-400" />
        </div>
        <div>
          {formatNumber(level)} m at {formatDateTime(date, {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </div>
      </div>
    )
  }
}

export default Vigicrue
