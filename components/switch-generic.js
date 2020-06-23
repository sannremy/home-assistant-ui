import React from 'react'

class SwitchGeneric extends React.Component {
  state = {
    enabled: false,
  }

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.icon = null
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
        <div className="w-12">{this.icon}</div>
        <div className="mt-6 font-semibold h-12">{name}</div>
        <div className="mt-3 font-light">{enabled ? 'On' : 'Off'}</div>
      </div>
    )
  }
}

export default SwitchGeneric
