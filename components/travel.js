import React from 'react'
import { Car } from '@styled-icons/boxicons-regular'

class Travel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // const {
    //   currentTemperature,
    // } = this.props

    return (
      <div>
        <ul>
          {Array.from('abcd').map(i => (
            <li key={i} className="flex odd:bg-gray-300 rounded px-4 py-2">
              <span className="block w-1/12">
                <span className="block w-5">
                  <Car />
                </span>
              </span>
              <span className="block w-9/12">Destination {i.toUpperCase()}</span>
              <span className="block w-2/12">23 mins</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Travel
