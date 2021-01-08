import React from 'react'
import { UpArrowCircle, Sun, DownArrowCircle, LoaderAlt, Moon } from '@styled-icons/boxicons-regular'
import { formatDateTime } from '../lib/text'

class Horizon extends React.Component {
  state = {

  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      sun,
    } = this.props

    let timeToDisplay
    let iconToDisplay = <LoaderAlt className="animate-spin" />

    if (sun.next_setting && sun.next_rising) {
      if (sun.next_setting < sun.next_rising) {
        timeToDisplay = sun.next_setting
        iconToDisplay = <DownArrowCircle />
      } else {
        timeToDisplay = sun.next_rising
        iconToDisplay = <UpArrowCircle />
      }
    }

    let sunOrMoon = <LoaderAlt className="w-full h-full animate-spin" />

    if (sun.state === 'below_horizon') {
      sunOrMoon = <Moon className="w-full h-full text-blue-600" />
    } else if (sun.state === 'above_horizon') {
      sunOrMoon = <Sun className="w-full h-full text-yellow-400" />
    }

    return (
      <div className="w-16 flex items-center flex-col justify-center">
        {sunOrMoon}
        <div className="flex items-center justify-center">
          <div className="flex items-center mt-1">
            <div className="flex items-center w-5 h-5 mr-1">
              {iconToDisplay}
            </div>
            {timeToDisplay && formatDateTime(timeToDisplay, {
              hour: "numeric",
              minute: "numeric",
            })}
            {!timeToDisplay && (
              <span>-</span>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Horizon
