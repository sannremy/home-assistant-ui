import { Sun } from '@styled-icons/boxicons-regular'
import React from 'react'
import { formatDateTime } from '../lib/text'

class DateTime extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      date,
    } = this.props

    return (
      <div>
        <div className="flex items-center justify-end text-2xl tracking-wide">
          <span>
            {formatDateTime(date, {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </span>
          <span className="mx-4 border border-indigo-900 w-px h-6" />
          <span className="mr-2">
            8&deg;
          </span>
          <span className="w-8 h-8 flex items-center">
            <Sun />
          </span>
        </div>
        <div className="flex items-center justify-end font-light">{formatDateTime(date, {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        })}</div>
      </div>
    )
  }
}

export default DateTime
