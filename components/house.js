import React from 'react'
import { Bulb, CameraHome } from '@styled-icons/boxicons-regular'
import Pin from './pin'
import homeConfig from '../home-config.json'

const elementsPerFloor = homeConfig.floors
const floors = elementsPerFloor.length

class House extends React.Component {
  state = {
    level: 2,
  }

  constructor(props) {
    super(props)

    this.handleChangeFloor = this.handleChangeFloor.bind(this)
  }

  handleChangeFloor(levelSelected) {
    const {
      level,
    } = this.state

    if (level !== levelSelected) {
      this.setState({
        level: levelSelected,
      })
    }
  }

  render() {
    const {
      level,
    } = this.state

    const {
      sensors,
      climate,
    } = this.props

    const transitionClassNames = 'transition duration-300 ease-in-out'

    const pinsPerFloor = [
      [ // floor 0
        {
          id: 'camera',
          content: <CameraHome />
        },
        {
          id: 'light1',
          content: <Bulb />
        },
        {
          id: 'light2',
          content: <Bulb />
        },
        {
          id: 'weather-station-indoor-1',
          content: (
            <span className="font-semibold">
              {/* {sensors && sensors['area1'] && (
                <span>{sensors['area1'].temperature}</span>
              )} */}
            </span>
          )
        },
        {
          id: 'weather-station-outdoor-1',
          content: (
            <span className="font-semibold">
              5.7
            </span>
          )
        },
      ],
      [ // floor 1
        {
          id: 'light3',
          content: <Bulb />
        },
        {
          id: 'weather-station-indoor-2',
          content: (
            <span className="font-semibold">
              19.9
            </span>
          )
        },
        {
          id: 'weather-station-indoor-3',
          content: (
            <span className="font-semibold">
              20.1
            </span>
          )
        },
        {
          id: 'thermostat',
          content: (
            <span className="font-semibold">
              19.8
            </span>
          )
        },
      ],
      [ // floor 2
        {
          id: 'weather-station-indoor-4',
          content: (
            <span className="font-semibold">
              19
            </span>
          )
        },
      ],
    ]

    return (
      <div className={`relative ${'level-' + level + '-selected'}`}>
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
              className={`Floor ${'Floor--level' + floorLevel} ${transitionClassNames} shadow-lg`}
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
              className={`${transitionClassNames} ${'Pins--level' + floorLevel}`}
            >
              {pinsPerFloor[floorLevel].map(pin => (
                <Pin key={'pin_' + pin.id} id={pin.id}>
                  <div className="w-12 h-12 p-2 bg-white rounded-full flex items-center justify-center">
                    <div style={{
                      transform: "translateY(0.1rem)",
                    }}>
                      {pin.content}
                    </div>
                  </div>
                </Pin>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default House
