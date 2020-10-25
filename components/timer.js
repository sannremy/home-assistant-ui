import { Stopwatch } from '@styled-icons/boxicons-regular'
import React from 'react'
import { dispatch } from '../lib/store'
import { switchTimer } from '../actions'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { formatSecondsToHHMMSS } from '../lib/text'


class Timer extends React.Component {
  state = {
    countdown: null,
    status: 'idle',
    timer: null,
    clicking: false,
    duration: null,
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
      duration,
    } = this.props

    // Duration in seconds
    const durations = duration.split(':').map(t => {
      return parseInt(t, 10)
    })
    let durationSeconds = durations[0] * 60 * 60 // hours
    durationSeconds += durations[1] * 60 // minutes
    durationSeconds += durations[2] // seconds

    let timer = this.state.timer
    let countdown = null

    // Countdown in seconds
    const getCountdown = (finishesAt) => {
      const now = new Date()
      const finishesAtDate = new Date(finishesAt)
      return Math.ceil((finishesAtDate - now) / 1000)
    }

    if (status !== 'idle' && finishesAt) {
      if (timer === null) {
        countdown = getCountdown(finishesAt)

        timer = setInterval(() => {
          this.setState({
            countdown: getCountdown(finishesAt)
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
      countdown,
      duration: durationSeconds,
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
      entityId,
    } = this.props

    const {
      status,
    } = this.state

    if (status === 'idle') {
      dispatch(switchTimer({
        entity_id: entityId,
        action: 'start',
      }))
    } else if (status === 'active') {
      dispatch(switchTimer({
        entity_id: entityId,
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
    } = this.props

    const {
      clicking,
      countdown,
      duration,
    } = this.state

    let text = formatSecondsToHHMMSS(duration)
    let icon = <Stopwatch className="w-full h-full" />
    let classNames = []
    if (status === 'active') {
      classNames.push('bg-yellow-400')
      const percentageRemaining = Math.round((duration - countdown) / duration * 100)
      icon = <CircularProgressbar
        className="w-full h-full"
        value={percentageRemaining}
        strokeWidth={10}
        styles={buildStyles({
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: `currentColor`,
          textColor: 'currentColor',
          trailColor: '#EBF4FF', // indigo-100
          backgroundColor: 'transparent',
        })}
      />
      text = formatSecondsToHHMMSS(countdown)
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
        className={`${classNames.join(' ')} w-40 px-6 py-4 transform rounded-lg cursor-pointer transition duration-150 ease-in-out`}
      >
        <div className="-ml-2 w-10 h-10">{icon}</div>
        <div className="mt-8 font-semibold">{name}</div>
        <div className="mt-4 font-light">{text}</div>
      </div>
    )
  }
}

export default Timer
