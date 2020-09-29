import { Play, PlayCircle } from '@styled-icons/boxicons-regular'
import React from 'react'
import { dispatch } from '../lib/store'
import { switchTimer } from '../actions'
import { CircularProgressbar } from 'react-circular-progressbar'


class Timer extends React.Component {
  state = {
    countdown: null,
    status: 'idle',
    timer: null,
    clicking: false,
  }

  constructor(props) {
    super(props)

    this.updateTimer = this.updateTimer.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleAnimationStart = this.handleAnimationStart.bind(this)
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this)
  }

  updateTimer() {
    const {
      status, // idle, active, paused
      finishesAt,
    } = this.props

    let timer = this.state.timer

    if (status !== 'idle' && finishesAt) {
      if (timer === null) {
        const finishesAtDate = new Date(finishesAt)

        timer = setInterval(() => {
          const now = new Date()
          this.setState({
            countdown: Math.floor((finishesAtDate - now) / 1000)
          })
        }, 1000)
      }
    } else {
      clearInterval(timer)
      timer = null
    }

    this.setState({
      timer,
      status,
    })
  }

  componentDidMount() {
    this.updateTimer()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.updateTimer()
    }
  }

  handleClick() {
    const {
      entity_id,
    } = this.props

    const {
      status,
    } = this.state

    if (status === 'idle') {
      dispatch(switchTimer({
        entity_id: this.props.entityId,
        action: 'start',
      }))
    } else if (status === 'active') {
      dispatch(switchTimer({
        entity_id: this.props.entityId,
        action: 'cancel',
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
      status, // idle, active, paused
      duration,
    } = this.props

    const {
      clicking,
      countdown,
    } = this.state

    let text = name
    let icon = <PlayCircle className="w-6" />
    let classNames = []
    if (status === 'active') {
      classNames.push('bg-yellow-400')
      icon = <CircularProgressbar value={countdown} text={`${66}%`} />
      text = countdown
    } else if (status === 'paused') {
      classNames.push('bg-yellow-200')
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
        className={`${classNames.join(' ')} flex items-center px-6 py-3 shadow-lg transform rounded-full cursor-pointer transition duration-150 ease-in-out`}
      >
        <div className="w-auto mr-2">
          {icon}
        </div>
        <div className="w-auto">{text}</div>
      </div>
    )
  }
}

export default Timer
