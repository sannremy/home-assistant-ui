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
        <div className="tracking-wide font-semibold">{formatDateTime(date, {
          hour: 'numeric',
          minute: 'numeric',
        })}</div>
        <div className="leading-tight font-light">{formatDateTime(date, {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        })}</div>
      </div>
    )
  }
}

export default DateTime
