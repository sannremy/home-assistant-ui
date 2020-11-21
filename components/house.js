import React from 'react'
import { Bulb, CameraHome } from '@styled-icons/boxicons-regular'
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

  handleChangeFloor(levelSelected) {
    const {
      level,
    } = this.state

    let newLevel = null
    if (level !== levelSelected) {
      newLevel = levelSelected
    }

    this.setState({
      level: newLevel,
    })
  }

  render() {
    const {
      level,
    } = this.state

    const floors = 3
    const elementsPerFloor = [
      ['garage', 'kitchen', 'wc1', 'garden'], // floor 0
      ['room1', 'room2', 'room3', 'office1', 'bathroom1', 'bathroom2', 'wc2'], // floor 1
      ['bathroom3', 'office2', 'attic'], // floor 2
    ]

    const pinsPerFloor = [
      [ // floor 0
        {
          id: 'camera',
          icon: <CameraHome />
        },
        {
          id: 'light1',
          icon: <Bulb />
        },
        {
          id: 'light2',
          icon: <Bulb />
        },
      ],
      [ // floor 1
        {
          id: 'light3',
          icon: <Bulb />
        },
      ],
      [ // floor 2

      ],
    ]

    const commonClassNames = 'transition duration-300 ease-in-out'
    const selected = level !== null ? 'level-' + level + '-selected' : ''

    return (
      <div className={`relative ${selected}`}>
        <div className="absolute">
          <ul>
            {[...Array(floors).keys()].reverse().map(floorLevel => (
              <li
                key={'text_' + floorLevel}
                onClick={() => this.handleChangeFloor(floorLevel)}
              >
                <a className={`${floorLevel === level ? 'border-indigo-200' : 'bg-white'} cursor-pointer font-semibold border-4 border-white p-2 w-16 h-16 flex items-center justify-center`}>
                  {floorLevel === 0 ? "RdC" : floorLevel}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="House">
          {[...Array(floors).keys()].map(floorLevel => (
            <div
              key={'image_' + floorLevel}
              className={`Floor ${'Floor--level' + floorLevel} ${commonClassNames} shadow-lg`}
              onClick={() => this.handleChangeFloor(floorLevel)}
            >
              {elementsPerFloor[floorLevel].map(element => (
                <div key={element} className={`Element Element--${element}`} />
              ))}
            </div>
          ))}
        </div>
        <div className={`Pins`}>
          {[...Array(floors).keys()].map(floorLevel => (
            <div
              key={'pin_' + floorLevel}
              className={`${commonClassNames} ${'Pins--level' + floorLevel}`}
            >
              {pinsPerFloor[floorLevel].map(pin => (
                <div key={pin.id} className={`Pin Pin--${pin.id} flex items-center`}>
                  <div className="w-10 h-10">
                    {pin.icon}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default House
