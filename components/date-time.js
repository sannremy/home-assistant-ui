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
      <div className="leading-tight">
        <div className="text-3xl">{formatDateTime(date, {
          hour: 'numeric',
          minute: 'numeric',
        })}</div>
        <div className="font-light">{formatDateTime(date, {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        })}</div>
      </div>
    )
  }
}

export default DateTime
