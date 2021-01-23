import React from 'react'
import { Battery, Bulb, CameraHome, LoaderAlt, MinusCircle, Plug, PlusCircle, Wifi, WifiOff } from '@styled-icons/boxicons-regular'
import Pin from './pin'
import homeConfig from '../home-config.json'
import { formatTemperature, formatNumber, formatClimatePresetMode } from '../lib/text'
import { miredToRGB } from '../lib/color'
import { dispatch } from '../lib/store'
import { switchLight } from '../actions'

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
      this.floorRefs[i] = React.createRef()
    }

    this.handleChangeFloor = this.handleChangeFloor.bind(this)
    this.handlePinClick = this.handlePinClick.bind(this)
    this.handleChangeClimate = this.handleChangeClimate.bind(this)
    this.handleToggleLight = this.handleToggleLight.bind(this)
    this.handleChangeLightPreset = this.handleChangeLightPreset.bind(this)
  }

  componentDidMount() {
    this.setState({
      cursor: this.floorRefs[this.state.level].current.offsetLeft,
    })
  }

  disablePin() {
    this.setState({
      showPinData: false,
    })

    setTimeout(() => {
      this.setState({
        pinId: null,
      })
    }, 300) // end of animation
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.ui.hasClickedOutside && this.props.ui.hasClickedOutside) {
      this.disablePin()
    }
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

    this.disablePin()
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
      this.disablePin()
    }
  }

  handleChangeClimate(increase) {
    const {
      climate,
    } = this.props

    if (climate) {
      let newTemp = climate.temperature
      if (increase) {
        newTemp += climate.target_temp_step
      } else {
        newTemp -= climate.target_temp_step
      }

      newTemp = Math.min(Math.max(newTemp, climate.min_temp), climate.max_temp)

      // dispatch action to climate
    }
  }

  handleToggleLight(event, light) {
    event.preventDefault()

    const enabled = light && light.state === "on" ? false : true

    dispatch(switchLight({
      entity_id: light.entityId,
      enabled,
    }))
  }

  handleChangeLightPreset(event, preset) {
    event.preventDefault()

    // preset

    // dispatch(switchLight({
    //   entity_id: light.entityId,
    //   enabled,
    // }))
  }

  render() {
    const {
      level,
      cursor,
      pinId,
      showPinData,
    } = this.state

    const {
      light,
      sensors,
      climate,
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
        if (
          pin.type === 'climate'
          || pin.type.indexOf("sensors.") === 0
        ) {
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
              <span className="font-semibold">{formatNumber(value)}</span>
            )
          } else {
            preview = <LoaderAlt className="animate-spin" />
          }

          let isActive = false
          let data = null
          if (pin.type === 'climate') {
            data = (
              <div>
                <div className="flex items-center px-6 py-2 text-sm font-semibold bg-indigo-200 rounded-t-lg">
                  <div className="flex-1">
                    <span>{pin.name || "Thermostat"}</span>
                  </div>
                  <div className="flex-1 flex items-center justify-end">
                    {climate && climate.battery_level && (
                      <div className="flex items-center">
                        <span className="mr-1">{climate.battery_level} %</span>
                        <Battery className="w-5" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-start px-6 py-4">
                  <div className="flex mr-4">
                    <div className={`text-center py-2 px-4 border border-gray-200 rounded-lg`}>
                      <div className="cursor-pointer" onClick={() => this.handleChangeClimate(true)}>
                        <PlusCircle className="w-5" />
                      </div>
                      <div className="my-1">
                        <span className="font-semibold">
                          {formatTemperature(climate.temperature, 1)}
                        </span>
                      </div>
                      <div className="cursor-pointer" onClick={() => this.handleChangeClimate(false)}>
                        <MinusCircle className="w-5" />
                      </div>
                    </div>
                  </div>
                  <ul className="leading-8">
                    {climate && climate.current_temperature && (
                      <li>
                        <span>Température : {formatTemperature(climate.current_temperature, 1)}</span>
                      </li>
                    )}
                    {climate && climate.hvac_action === "heating" && (
                      <li>
                        <span>Status : En chauffe</span>
                      </li>
                    )}
                    {climate && climate.preset_mode && (
                      <li>
                        <span>Mode : {formatClimatePresetMode(climate.preset_mode)}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )

            isActive = climate.hvac_action === "heating"
          } else if (pin.type.indexOf("sensors.") === 0) {
            const sensor = sensors[pin.type.split('.')[1]]

            data = (
              <div>
                <div className="flex items-center px-6 py-2 text-sm font-semibold bg-indigo-200 rounded-t-lg">
                  <div className="flex-1">
                    <span>{pin.name || "Module"}</span>
                  </div>
                  <div className="flex-1 flex items-center justify-end">
                    <div className="flex items-center border-r-2 border-indigo-900 pr-2 mr-2">
                      {sensor && (sensor.radio_level || sensor.wifi_level) && (
                        <span className="mr-1">{sensor.radio_level || sensor.wifi_level} dBm</span>
                      )}
                      {sensor && sensor.reachability && (
                        <Wifi className="w-5" />
                      )}
                      {sensor && !sensor.reachability && (
                        <WifiOff className="w-5" />
                      )}
                    </div>
                    <div>
                      {sensor && sensor.battery_percent && (
                        <div className="flex items-center">
                          <span className="mr-1">{sensor.battery_percent} %</span>
                          <Battery className="w-5" />
                        </div>
                      )}
                      {sensor && !sensor.battery_percent && (
                        <div>
                          <Plug className="w-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-start px-6 py-4 leading-8">
                  <ul className="w-1/2">
                    {sensor && sensor.temperature && (
                      <li>
                        <span>Température : {formatTemperature(sensor.temperature, 1)}</span>
                      </li>
                    )}
                    {sensor && sensor.humidity && (
                      <li>
                        <span>Humidité : {sensor.humidity} %</span>
                      </li>
                    )}
                    {sensor && sensor.pressure && (
                      <li>
                        <span>Pression : {formatNumber(sensor.pressure)} millibars</span>
                      </li>
                    )}
                  </ul>
                  <ul className="w-1/2">
                    {sensor && sensor.co2 && (
                      <li>
                        <span>CO2 : {sensor.co2} ppm</span>
                      </li>
                    )}
                    {sensor && sensor.noise && (
                      <li>
                        <span>Bruit : {sensor.noise} dB</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )
          } else {
            data = pId + ' data'
          }

          // Pins for sensors and climate
          pinsPerFloor[pin.floor].push({
            id: pId,
            preview,
            style: pin.style || {},
            isActive,
          })

          pins[pId] = {
            data,
          }
        } else if (pin.type.indexOf("light.") === 0) {
          const l = light[pin.type]

          let brightness = null
          if (l) {
            if (isNaN(l.brightness)) {
              brightness = 0
            } else {
              brightness = Math.round(l.brightness / 255 * 100)
            }
          }

          let [
            red,
            blue,
            green,
            alpha,
          ] = [0, 0, 0, 0.1]

          if (l && l.rgb_color) {
            [
              red,
              blue,
              green
            ] = l.rgb_color
            alpha = 1
          } else if (l && l.color_temp) {
            [red, blue, green] = miredToRGB(l.color_temp)
            alpha = 1
          }

          const data = (
            <div>
              <div className="flex items-center px-6 py-2 text-sm font-semibold bg-indigo-200 rounded-t-lg">
                <div className="flex-1">
                  <span>{pin.name || "Module"}</span>
                </div>
              </div>
              <div className="flex items-start px-6 py-4">
                <ul className="w-1/4">
                  {l && l.state && (
                    <li>
                      <button onClick={(e) => this.handleToggleLight(e, l)}>{l.state}</button>
                    </li>
                  )}
                  {l && l.effect && (
                    <li>{l.effect}</li>
                  )}
                  {l && (l.rgb_color || l.color_temp) && (
                    <li className="flex items-center">
                      <div className="mr-2">Couleur</div>
                      <div className="border border-white w-5 h-5 rounded-full" style={{
                        backgroundColor: `rgba(${red}, ${blue}, ${green}, ${alpha})`
                      }} />
                    </li>
                  )}
                  {l && l.state === "on" && brightness && (
                    <li>{brightness} %</li>
                  )}
                </ul>
                <div>
                  <button onClick={(e) => this.handleChangeLightPreset(e, 'read')}>Preset Read</button>
                  <button onClick={(e) => this.handleChangeLightPreset(e, 'artic')}>Preset Artic</button>
                </div>
              </div>
            </div>
          )
          pinsPerFloor[pin.floor].push({
            id: pId,
            preview: <Bulb />,
            style: pin.style || {},
            isActive: l && l.state === "on",
          })

          pins[pId] = {
            data,
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
      <div className={`h-full relative ${'level-' + level + '-selected'}`}>
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
                  isSelected={pin.id === pinId && showPinData}
                  isActive={pin.isActive}
                  onClick={(e) => this.handlePinClick(e, pin.id)}
                >
                  {pin.preview}
                </Pin>
              ))}
            </div>
          ))}
        </div>

        {/* Info Panel */}
        <div className={`${showPinData ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} Panel absolute w-1/2 mx-auto my-0 left-0 right-0 transform transition duration-300 ease-in-out`}>
          <div className="bg-white rounded-lg shadow-xl">
            {pinId && pins[pinId].data}
          </div>
        </div>
      </div>
    )
  }
}

export default House
