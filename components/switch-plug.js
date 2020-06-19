import React from 'react'
import { Plug } from '@styled-icons/boxicons-regular'

class SwitchPlug extends React.Component {
  state = {
    enabled: false,
  }

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      enabled: this.props.state === 'on',
    })
  }

  handleClick() {
    this.setState({
      enabled: !this.state.enabled,
    })
  }

  render() {
    const {
      name,
    } = this.props

    const {
      enabled,
    } = this.state

    let backgroundColor = 'bg-white'
    if (enabled) {
      backgroundColor = 'bg-yellow-400'
    }

    return (
      <div className={`rounded-lg ${backgroundColor} p-6 cursor-pointer transition duration-150 ease-in-out`} onClick={this.handleClick}>
        <div className="w-12"><Plug /></div>
        <div className="mt-6 font-semibold h-12">{name}</div>
        <div className="mt-4 font-light">{enabled ? 'On' : 'Off'}</div>
      </div>
    )
  }
}

export default SwitchPlug
