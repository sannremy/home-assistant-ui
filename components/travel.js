import React from 'react'
import { Car, Train } from '@styled-icons/boxicons-regular'

class Travel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {Array.from('abc').map(i => (
          <div key={i} className="mb-4">
            <div className="font-semibold">Destination {i.toUpperCase()}</div>
            <div className="flex items-center text-sm">
              <Car className="w-5 mr-2" />
              {/* <Train className="w-5 mr-1" /> */}
              <div>23 mins</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Travel
