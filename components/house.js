import React from 'react'
import { Bulb, Car, Home, Plug, TimeFive } from '@styled-icons/boxicons-regular'
import { changeView } from '../actions'
import { dispatch } from '../lib/store'

class House extends React.Component {
  state = {
    level: null,
  }

  constructor(props) {
    super(props)

    this.handleChangeFloor = this.handleChangeFloor.bind(this)
  }

  handleChangeFloor(level) {
    this.setState({
      level,
    })
  }

  render() {
    const {
      level,
    } = this.state

    const floors = 3
    const commonClassNames = 'transition duration-500 ease-in-out'
    const selected = level !== null ? ' House--floor' + level + '-selected' : ''

    return (
      <div className="relative">
        <div className="absolute">
          <ul>
            {[...Array(floors).keys()].reverse().map(floorLevel => (
              <li
                key={'text_' + floorLevel}
                onClick={() => this.handleChangeFloor(floorLevel)}
              >
                <a className={`${floorLevel === level ? 'bg-indigo-100 border-indigo-200' : 'bg-white'} font-semibold border-l-4 p-2 w-16 h-16 flex items-center justify-center`}>
                  {floorLevel === 0 ? "RdC" : floorLevel}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={`House${selected}`}>
          {[...Array(floors).keys()].map(floorLevel => (
            <div
              key={'image_' + floorLevel}
              className={`Floor ${'Floor--level' + floorLevel} ${commonClassNames}`}
              onClick={() => this.handleChangeFloor(floorLevel)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default House
