import React from 'react'
import { Car, Train } from '@styled-icons/boxicons-regular'

class Travel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ul>
          {Array.from('ab').map(i => (
            <li key={i} className="flex odd:bg-gray-300 rounded px-4 py-2">
              <span className="flex items-center w-1/12">
                <Car className="block w-5" />
              </span>
              <span className="block w-9/12">Destination {i.toUpperCase()}</span>
              <span className="block w-2/12">23 mins</span>
            </li>
          ))}
          {Array.from('c').map(i => (
            <li key={i} className="flex odd:bg-gray-300 rounded px-4 py-2">
              <span className="flex items-center w-1/12">
                <Train className="block w-5" />
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
