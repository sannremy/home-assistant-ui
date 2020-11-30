import React from 'react'
import { Bulb, CameraHome, LoaderAlt } from '@styled-icons/boxicons-regular'
import Pin from './pin'
import homeConfig from '../home-config.json'

const elementsPerFloor = homeConfig.floors
const floors = elementsPerFloor.length

class House extends React.Component {
  state = {
    level: floors - 1,
    cursor: 0,
  }

  constructor(props) {
    super(props)

    this.floorRefs = []
    for (let i = 0; i < floors; i++) {
      this.floorRefs[i] = React.createRef();
    }

    this.icons = {
      'Bulb': <Bulb />,
      'CameraHome': <CameraHome />,
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
      sensors, // used in eval
      climate, // used in eval
    } = this.props

    const transitionClassNames = 'transition duration-300 ease-in-out'

    const pinsPerFloor = []
    for (let i = 0; i < floors; i++) {
      pinsPerFloor.push([])
    }

    for (const pinId in homeConfig.pins) {
      if (homeConfig.pins.hasOwnProperty(pinId)) {
        const pin = homeConfig.pins[pinId];
        if (pin.type === 'variable') {
          const vars = pin.content.split('.')
          const varsChains = []

          const conditions = vars.map(v => {
            varsChains.push(v)
            return varsChains.join('.')
          })

          const value = eval(conditions.join(' && '))
          let content = null
          if (value) {
            content = (
              <span className="font-semibold">{value}</span>
            )
          } else {
            content = <LoaderAlt className="animate-spin" />
          }

          pinsPerFloor[pin.floor].push({
            id: pinId,
            content,
            style: pin.style || {},
          })
        } else if (pin.type === 'icon') {
          if (this.icons[pin.content]) {
            pinsPerFloor[pin.floor].push({
              id: pinId,
              content: this.icons[pin.content],
              style: pin.style || {},
            })
          } else {
            console.warn('Unknown Pin icon', pin)
          }
        } else {
          console.warn('Unknown Pin type', pin)
        }
      }
    }

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
                <Pin key={'pin_' + pin.id} id={pin.id} style={pin.style}>
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
