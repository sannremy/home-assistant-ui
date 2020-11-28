import React from 'react'
import { Bulb, CameraHome } from '@styled-icons/boxicons-regular'
import Pin from './pin'
import homeConfig from '../home-config.json'

const elementsPerFloor = homeConfig.floors
const floors = elementsPerFloor.length

class House extends React.Component {
  state = {
    level: 2,
    cursor: 0,
  }

  constructor(props) {
    super(props)

    this.floorRefs = []
    for (let i = 0; i < floors; i++) {
      this.floorRefs[i] = React.createRef();
    }

    this.handleChangeFloor = this.handleChangeFloor.bind(this)
  }

  componentDidMount() {
    this.setState({
      cursor: this.floorRefs[this.state.level].current.offsetLeft,
    })
  }

  handleChangeFloor(levelSelected) {
    const {
      level,
    } = this.state

    if (level !== levelSelected) {
      this.setState({
        level: levelSelected,
        cursor: this.floorRefs[levelSelected].current.offsetTop,
      })
    }
  }

  render() {
    const {
      level,
      cursor,
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
          <ul className="relative bg-white">
            <li className={`absolute bg-indigo-100 border-4 border-indigo-200 p-2 w-16 h-16 z-0 ${transitionClassNames}`} style={{
              transform: `translateY(${cursor}px)`,
            }} />
            {[...Array(floors).keys()].reverse().map(floorLevel => (
              <li
                ref={this.floorRefs[floorLevel]}
                key={'text_' + floorLevel}
                onClick={() => this.handleChangeFloor(floorLevel)}
                className="relative z-10"
              >
                <a className={`cursor-pointer font-semibold p-2 w-16 h-16 flex items-center justify-center`}>
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
