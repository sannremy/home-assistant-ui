import React from 'react'

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
      <div className="bg-white py-2 px-4 rounded shadow text-center cursor-pointer">
        {name} - {state}
      </div>
    )
  }
}

export default SwitchPlug
