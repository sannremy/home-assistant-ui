import React from 'react'
import { dispatch } from '../lib/store'
import { switchLight, switchPlug } from '../actions'

class SwitchGeneric extends React.Component {
  state = {
    enabled: false,
  }

  constructor(props) {
    super(props)

    this.type = null
    this.icon = null

    this.handleClick = this.handleClick.bind(this)
    this.handleAnimationStart = this.handleAnimationStart.bind(this)
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this)
  }

  componentDidMount() {
    this.setState({
      enabled: this.props.state === 'on',
    })
  }

  handleClick() {
    const enabled = !this.state.enabled
    this.setState({
      enabled,
    })

    if (this.type === 'light') {
      dispatch(switchLight({
        entity_id: this.props.entityId,
        enabled,
      }))
    } else if (this.type === 'plug') {
      dispatch(switchPlug({
        entity_id: this.props.entityId,
        enabled,
      }))
    }
  }

  handleAnimationStart() {
    this.setState({
      clicking: true,
    })
  }

  handleAnimationEnd() {
    this.setState({
      clicking: false,
    })
  }

  render() {
    const {
      name,
    } = this.props

    const {
      enabled,
      clicking,
    } = this.state

    let classNames = []
    if (enabled) {
      classNames.push('bg-yellow-400')
    } else {
      classNames.push('bg-white')
    }

    if (clicking) {
      classNames.push('scale-90')
    }

    return (
      <div
        onTouchStart={this.handleAnimationStart}
        onTouchEnd={this.handleAnimationEnd}
        onMouseDown={this.handleAnimationStart}
        onMouseUp={this.handleAnimationEnd}
        onMouseLeave={this.handleAnimationEnd}
        onClick={this.handleClick}
        className={`${classNames.join(' ')} transform rounded-lg p-6 cursor-pointer transition duration-150 ease-in-out`}>
        <div className="w-12">{this.icon}</div>
        <div className="mt-6 font-semibold h-12">{name}</div>
        <div className="mt-3 font-light">{enabled ? 'On' : 'Off'}</div>
      </div>
    )
  }
}

export default SwitchGeneric
