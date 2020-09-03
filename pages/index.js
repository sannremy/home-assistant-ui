import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import Weather from '../components/weather'
import DateTime from '../components/date-time'
import Thermostat from '../components/thermostat'
import Travel from '../components/travel'
import WeatherForecast from '../components/weather-forecast'
import AreaSensor from '../components/area-sensor'
import homeConfig from '../home-config.json'
import SwitchPlug from '../components/switch-plug'
import SwitchLight from '../components/switch-light'
import { formatDateTime } from '../lib/text'
import Vigicrue from '../components/vigicrue'

let interval = null

class Home extends React.Component {
  state = {
    currentDate: new Date(),
    fullscreen: false,
  }

  constructor(props) {
    super(props)

    this.toggleFullscreen = this.toggleFullscreen.bind(this)
  }

  componentDidMount() {
    interval = setInterval(() => {
      this.setState({
        currentDate: new Date()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(interval)
  }

  toggleFullscreen() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else {
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else {
          if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          }
        }
      }
    } else {
      const _element = document.documentElement;
      if (_element.requestFullscreen) {
        _element.requestFullscreen()
      } else {
        if (_element.mozRequestFullScreen) {
          _element.mozRequestFullScreen()
        } else {
          if (_element.webkitRequestFullscreen) {
            _element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          }
        }
      }
    }
  }

  render() {
    const {
      climate,
      sensor,
      light,
      switchPlug,
      weather,
    } = this.props

    // Gust angle
    let gustAngle = null
    if (sensor.anemometer && sensor.anemometer.hasOwnProperty('gust_angle')) {
      const angleExtracted = sensor.anemometer.gust_angle.match(/\d+/)
      if (angleExtracted.length) {
        gustAngle = parseInt(angleExtracted[0], 10)
      }
    }

    // Latest vigicrue
    let vigicrueHydro = null
    if (sensor.vigicrue && sensor.vigicrue.hasOwnProperty('vigicrue_hydro_observation')) {
      const hydroLength = sensor.vigicrue.vigicrue_hydro_observation.Serie.ObssHydro.length
      vigicrueHydro = sensor.vigicrue.vigicrue_hydro_observation.Serie.ObssHydro[hydroLength - 1]
      vigicrueHydro = {
        date: new Date(vigicrueHydro.DtObsHydro),
        level: vigicrueHydro.ResObsHydro,
      }
    }

    const title = `Home`

    return (
      <div className="h-full text-indigo-900">
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="h-full px-6 py-6">
          {/* Header */}
          <div className="h-auto flex -mx-3">
            <div className="w-3/12 px-3" onClick={this.toggleFullscreen}>
              <DateTime date={this.state.currentDate} />
            </div>

            <div className="w-9/12 px-3">
              <div className="flex items-start">
                <div className="mr-6">
                  {weather.temperature && (
                    <Weather
                      {...weather}
                      sensor={sensor.meteofrance}
                    />
                  )}
                </div>
                <div>
                  <WeatherForecast
                    forecast={weather.forecast}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cols */}
          <div className="flex items-stretch -mx-3 mt-3">
            <div className="w-3/12 px-3">
              <div>
                <ul>
                  <li className="pb-2">
                    {(climate.temperature && (
                      <Thermostat {...climate} />
                    ))}
                  </li>
                  {Object.keys(homeConfig.areas).map(area => (
                    <li key={area} className="py-2 border-t border-white">
                      {sensor[area] && (
                        <AreaSensor
                          config={homeConfig.areas[area]}
                          data={sensor[area]}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-6/12 px-3">
              <div className="flex -mx-3">
                {Object.entries(light).map(([key, item], index) => (
                    <div key={`light-${item.name}-${item.state}`} className="w-1/3 mx-2">
                      <SwitchLight {...item} />
                    </div>
                  ))}
              </div>

              <div className="mt-4">
                <div className="flex -mx-3 mt-2">
                  {Object.entries(switchPlug).map(([key, item], index) => (
                    <div key={`plug-${item.name}-${item.state}`} className="w-1/3 mx-2">
                      <SwitchPlug {...item} />
                    </div>
                  ))}
                  <div className="w-1/3 mx-2">
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/12 px-3">
              <div>
                {sensor.googleTravelTime && Object.entries(sensor.googleTravelTime).map(([key, item], index) => (
                  <div key={index} className="py-2 last:border-0 border-b border-white">
                    <Travel
                      config={homeConfig.travels[item.id]}
                      mode="car"
                      data={item}
                    />
                  </div>
                ))}
                {sensor.transilien && sensor.transilien.transilien_search && sensor.transilien.transilien_search.nextTrainsList.slice(0, 2).map((item, index) => (
                  <div key={index} className="py-2 last:border-0 border-b border-white">
                    <Travel
                      mode="train"
                      data={item}
                    />
                  </div>
                ))}
              </div>

              <div>
                {vigicrueHydro && (
                  <div className="py-2 last:border-0 border-b border-white">
                    <Vigicrue level={vigicrueHydro.level} date={vigicrueHydro.date} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    climate: state.Climate,
    sensor: state.Sensor,
    light: state.Light,
    switchPlug: state.SwitchPlug,
    weather: state.Weather,
  }
}

export default connect(mapStateToProps)(Home)
