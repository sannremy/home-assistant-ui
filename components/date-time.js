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
        <span className="tracking-wide">{formatDateTime(date, {
          hour: 'numeric',
          minute: 'numeric',
        })}</span>, <span>{formatDateTime(date, {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        })}</span>
      </div>
    )
  }
}

export default DateTime
