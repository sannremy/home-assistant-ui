import React from 'react'
import { Plug } from '@styled-icons/boxicons-regular'

class SwitchPlug extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      name,
      state,
    } = this.props

    return (
      <div className="flex items-center bg-white py-2 px-4 rounded shadow text-center cursor-pointer">
        <Plug className="w-5 mr-2" />
        <div>
          {name} - {state}
        </div>
      </div>
    )
  }
}

export default SwitchPlug
