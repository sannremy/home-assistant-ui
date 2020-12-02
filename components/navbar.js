import React from 'react'
import { Bulb, Car, Home, Plug, TimeFive } from '@styled-icons/boxicons-regular'
import { changeView } from '../actions'
import { dispatch } from '../lib/store'

class Navbar extends React.Component {
  state = {
    currentView: 'home',
    cursor: null,
  }

  constructor(props) {
    super(props)

    this.iconRefs = {
      home: React.createRef(),
      lights: React.createRef(),
      plugs: React.createRef(),
      travels: React.createRef(),
      timers: React.createRef(),
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      currentView: this.props.view,
      cursor: this.iconRefs['home'].current.offsetLeft,
    })
  }

  handleClick(view) {
    this.setState({
      currentView: view,
      cursor: this.iconRefs[view].current.offsetLeft,
    })

    dispatch(changeView({
      view
    }))
  }

  render() {
    const {
      cursor,
    } = this.state

    const commonClassNames = 'relative block text-center px-8 py-4 h-16 z-10 focus:outline-none'

    return (
      <div className="absolute bottom-0 w-full bg-white border-t border-indigo-200">
        <ul className="relative flex items-center justify-center">
          {/* Cursor */}
          <li className="absolute left-0 block px-8 py-4 h-16 border-t-4 border-indigo-200 bg-indigo-100 z-0 transition duration-300 ease-in-out" style={{
            transform: `translateX(${cursor}px)`,
          }}>
            <div style={{
              width: '32px',
              height: '32px',
            }} />
          </li>
          {/* Icons */}
          <li ref={this.iconRefs['home']}>
            <a href="#" onClick={() => this.handleClick('home')} className={commonClassNames}>
              <Home className="h-full" />
            </a>
          </li>
          <li ref={this.iconRefs['lights']}>
            <a href="#" onClick={() => this.handleClick('lights')} className={commonClassNames}>
              <Bulb className="h-full" />
            </a>
          </li>
          <li ref={this.iconRefs['plugs']}>
            <a href="#" onClick={() => this.handleClick('plugs')} className={commonClassNames}>
              <Plug className="h-full" />
            </a>
          </li>
          <li ref={this.iconRefs['travels']}>
            <a href="#" onClick={() => this.handleClick('travels')} className={commonClassNames}>
              <Car className="h-full" />
            </a>
          </li>
          <li ref={this.iconRefs['timers']}>
            <a href="#" onClick={() => this.handleClick('timers')} className={commonClassNames}>
              <TimeFive className="h-full" />
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Navbar
