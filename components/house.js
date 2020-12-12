import React from 'react'
import { Battery, Bulb, CameraHome, LoaderAlt, TargetLock } from '@styled-icons/boxicons-regular'
import Pin from './pin'
import homeConfig from '../home-config.json'
import { formatTemperature } from '../lib/text'

const elementsPerFloor = homeConfig.floors
const floors = elementsPerFloor.length

class House extends React.Component {
  state = {
    level: floors - 1,
    cursor: 0,
    pinId: null,
    showPinData: false,
  }

  constructor(props) {
    super(props)

    this.floorRefs = []
    for (let i = 0; i < floors; i++) {
      this.floorRefs[i] = React.createRef();
    }

    this.handleChangeFloor = this.handleChangeFloor.bind(this)
    this.handlePinClick = this.handlePinClick.bind(this)
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
        showPinData: false,
      })

      setTimeout(() => {
        this.setState({
          pinId: null,
        })
      }, 300) // end of animation
    }
  }

  handlePinClick(event, clickedPinId) {
    event.preventDefault()

    const {
      pinId,
    } = this.state

    let showPinData = clickedPinId !== pinId

    this.setState({
      pinId: clickedPinId,
      showPinData,
    })

    if (!showPinData) {
      setTimeout(() => {
        this.setState({
          pinId: null,
        })
      }, 300) // end of animation
    }
  }

  render() {
    const {
      level,
      cursor,
      pinId,
      showPinData,
    } = this.state

    const {
      sensors, // used in eval
      climate, // used in eval
    } = this.props

    const transitionClassNames = 'transition duration-300 ease-in-out'

    const pins = {}
    const pinsPerFloor = []
    for (let i = 0; i < floors; i++) {
      pinsPerFloor.push([])
    }

    for (const pId in homeConfig.pins) {
      if (homeConfig.pins.hasOwnProperty(pId)) {
        const pin = homeConfig.pins[pId];
        if (pin.type === 'variable' || pin.type === 'climate') {
          const vars = pin.preview.split('.')
          const varsChains = []

          const conditions = vars.map(v => {
            varsChains.push(v)
            return varsChains.join('.')
          })

          const value = eval(conditions.join(' && '))
          let preview = null
          if (value) {
            preview = (
              <span className="font-semibold">{value}</span>
            )
          } else {
            preview = <LoaderAlt className="animate-spin" />
          }

          let data = null
          if (pin.type === 'climate') {
            data = (
              <div className="flex items-start">
                <ul className="w-1/2">
                  <li className="flex items-center">
                    <span>Set: {formatTemperature(climate.temperature)}</span>
                  </li>
                </ul>
                <ul className="w-1/2">
                  <li className="flex items-center">
                    <span>{climate.batteryPercent}%</span>
                    <Battery className="w-5 ml-1" />
                  </li>
                </ul>
              </div>
            )
          } else {
            data = pId + ' data'
          }

          pinsPerFloor[pin.floor].push({
            id: pId,
            preview,
            style: pin.style || {},
          })

          pins[pId] = {
            data,
          }
        } else if (pin.type === 'light') {
          pinsPerFloor[pin.floor].push({
            id: pId,
            preview: <Bulb />,
            style: pin.style || {},
          })

          pins[pId] = {
            data: pId + ' data',
          }
        } else if (pin.type === 'camera') {
          pinsPerFloor[pin.floor].push({
            id: pId,
            preview: <CameraHome />,
            style: pin.style || {},
          })

          pins[pId] = {
            data: pId + ' data',
          }
        } else {
          console.warn('Unknown Pin type', pin)
        }
      }
    }

    return (
      <div className={`relative ${'level-' + level + '-selected'}`}>

        {/* Levels */}
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

        {/* Floors */}
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

        {/* Pins */}
        <div className={`Pins`}>
          {[...Array(floors).keys()].map(floorLevel => (
            <div
              key={'pin_' + floorLevel}
              className={`${transitionClassNames} ${'Pins--level' + floorLevel}`}
            >
              {pinsPerFloor[floorLevel].map(pin => (
                <Pin
                  key={'pin_' + pin.id}
                  id={pin.id}
                  style={pin.style}
                  isSelected={pin.id === pinId}
                  onClick={(e) => this.handlePinClick(e, pin.id)}
                >
                  {pin.preview}
                </Pin>
              ))}
            </div>
          ))}
        </div>

        {/* Info Panel */}
        <div className={`${showPinData ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} Panel absolute w-1/2 mx-auto my-0 left-0 right-0 shadow-xl transform transition duration-300 ease-in-out`}>
          <div className="bg-white px-6 py-4 rounded-lg">
            {pinId && pins[pinId].data}
          </div>
        </div>
      </div>
    )
  }
}

export default House
