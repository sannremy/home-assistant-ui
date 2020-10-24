import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import homeConfig from '../home-config.json'

import Weather from '../components/weather'
import DateTime from '../components/date-time'
import Thermostat from '../components/thermostat'
import Travel from '../components/travel'
import WeatherForecast from '../components/weather-forecast'
import AreaSensor from '../components/area-sensor'
import SwitchPlug from '../components/switch-plug'
import SwitchLight from '../components/switch-light'
import Vigicrue from '../components/vigicrue'
import Timer from '../components/timer'
import { Bulb, Calendar, Car, Home, TimeFive } from '@styled-icons/boxicons-regular'

let interval = null

class Home extends React.Component {
  state = {
    currentDate: new Date(),
    fullscreen: false,
  }

  constructor(props) {
    super(props)
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

  render() {
    const {
      climate,
      sensor,
      light,
      switchPlug,
      weather,
      timer,
    } = this.props

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
    const prefixPublicFolder = process.env.isProd ? '/local' : ''

    return (
      <div className="relative h-full text-indigo-900">
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content="Best Home Assistant UI" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />

          <meta name="application-name" content="Home Assistant UI" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Home Assistant UI" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="apple-touch-icon" sizes="180x180" href={`${prefixPublicFolder}/apple-touch-icon.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${prefixPublicFolder}/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${prefixPublicFolder}/favicon-16x16.png`} />
          <link rel="manifest" href={`${prefixPublicFolder}/manifest.json`} />
          <link rel="mask-icon" href={`${prefixPublicFolder}/safari-pinned-tab.svg" color="#5bbad5`} />
          <link rel="shortcut icon" href={`${prefixPublicFolder}/favicon.ico`} />
        </Head>

        <main className="h-full px-6 py-6">
          {/* Header */}
          <div className="h-auto flex -mx-3">
            <div className="w-3/12 px-3">
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
                <div>
                  {(climate.temperature && (
                    <Thermostat {...climate} />
                  ))}
                </div>
                <div>
                  <ul>
                    {Object.keys(homeConfig.areas).map(area => (
                      <li key={area} className="my-4">
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
            </div>
            <div className="w-6/12 px-3">
              <div className="flex flex-wrap -mx-3">
                {Object.entries(light).map(([key, item], index) => (
                  <div key={`light-${item.name}-${item.state}`} className="w-auto mr-4">
                    <SwitchLight {...item} />
                  </div>
                ))}
                {Object.entries(switchPlug).map(([key, item], index) => (
                  <div key={`plug-${item.name}-${item.state}`} className="w-auto mt-4 mr-4">
                    <SwitchPlug {...item} />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap -mx-3">
                {Object.entries(timer).map(([key, item], index) => (
                  <div key={`timer-${item.name}-${item.state}`} className="w-auto mt-4 mr-4">
                    <Timer {...item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-3/12 px-3">
              <div>
                {sensor.googleTravelTime && Object.entries(sensor.googleTravelTime).map(([key, item], index) => (
                  <div key={index} className="my-4">
                    <Travel
                      config={homeConfig.travels[item.id]}
                      mode="car"
                      data={item}
                    />
                  </div>
                ))}
                {sensor.transilien && sensor.transilien.transilien_search && sensor.transilien.transilien_search.nextTrainsList && sensor.transilien.transilien_search.nextTrainsList.slice(0, 2).map((item, index) => (
                  <div key={index} className="my-4">
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
        <div className="absolute bottom-0 w-full bg-white border-t border-indigo-200">
          <ul className="flex items-center justify-center">
            <li>
              <a className="block text-center bg-indigo-100 px-8 py-4 h-16 border-t-4 border-indigo-200">
                <Home className="h-full" />
              </a>
            </li>
            <li>
              <a className="block text-center px-8 py-4 h-16 border-t-4 border-white">
                <Bulb className="h-full" />
              </a>
            </li>
            <li>
              <a className="block text-center px-8 py-4 h-16 border-t-4 border-white">
                <Car className="h-full" />
              </a>
            </li>
            <li>
              <a className="block text-center px-8 py-4 h-16 border-t-4 border-white">
                <TimeFive className="h-full" />
              </a>
            </li>
            <li>
              <a className="block text-center px-8 py-4 h-16 border-t-4 border-white">
                <Calendar className="h-full" />
              </a>
            </li>
          </ul>
        </div>
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
    timer: state.Timer,
  }
}

export default connect(mapStateToProps)(Home)