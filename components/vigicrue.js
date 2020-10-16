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
        <div className="mr-3 w-1/6">
          <Water className="rounded-full bg-indigo-200 p-2 w-full" />
        </div>
        <div className="w-5/6">
          <div>
            {formatNumber(level)} m
          </div>
          <div className="text-sm">
            {formatDateTime(date, {
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Vigicrue
