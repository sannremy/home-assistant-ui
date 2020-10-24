import React from 'react'
import { Bulb, Calendar, Car, Home, TimeFive } from '@styled-icons/boxicons-regular'
import { changeView } from '../actions'

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(view) {
    changeView({
      view,
    })
  }

  render() {
    const {
      view,
    } = this.props

    const commonClassNames = 'block text-center px-8 py-4 h-16 border-t-4'
    const commonSelectedClassNames = 'border-white bg-white'
    const selectedClassNames = {
      home: commonSelectedClassNames,
      lights: commonSelectedClassNames,
      travels: commonSelectedClassNames,
      timers: commonSelectedClassNames,
      calendar: commonSelectedClassNames,
    }

    selectedClassNames[view] = 'border-indigo-200 bg-indigo-100'

    return (
      <div className="absolute bottom-0 w-full bg-white border-t border-indigo-200">
        <ul className="flex items-center justify-center">
          <li>
            <a href="#" onClick={this.handleClick('home')} className={commonClassNames + ' ' + selectedClassNames['home']}>
              <Home className="h-full" />
            </a>
          </li>
          <li>
            <a href="#" onClick={this.handleClick('lights')} className={commonClassNames + ' ' + selectedClassNames['lights']}>
              <Bulb className="h-full" />
            </a>
          </li>
          <li>
            <a href="#" onClick={this.handleClick('travels')} className={commonClassNames + ' ' + selectedClassNames['travels']}>
              <Car className="h-full" />
            </a>
          </li>
          <li>
            <a href="#" onClick={this.handleClick('timers')} className={commonClassNames + ' ' + selectedClassNames['timers']}>
              <TimeFive className="h-full" />
            </a>
          </li>
          <li>
            <a href="#" onClick={this.handleClick('calendar')} className={commonClassNames + ' ' + selectedClassNames['calendar']}>
              <Calendar className="h-full" />
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Navbar
