import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { formatDateTime, formatTemperature } from '../lib/text'
import WeatherForecast from '../components/weather-forecast'
import DateTime from '../components/date-time'
import SwitchPlug from '../components/switch-plug'
import Thermostat from '../components/thermostat'
import Travel from '../components/travel'
import { weatherIconMap } from '../lib/icon'
import { Droplet, Navigation } from '@styled-icons/boxicons-regular'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      climate,
      sensor,
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

    const title = `Home`

    return (
      <div className="h-full text-gray-800">
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="h-full">
          <div className="flex items-stretch h-full">
            {/* Home */}
            <div className="relative w-7/12 bg-gray-300 bg-center bg-no-repeat" style={{
              backgroundImage: 'url(/home.png)',
              backgroundSize: '90%',
            }}>
              <div className="relative bg-gray-200 py-2 px-4">
                <ul className="flex items-center">
                  <li className="mr-5">
                    {sensor.outdoor
                    && sensor.outdoor.hasOwnProperty('temperature')
                    && weather.hasOwnProperty('condition')
                    && (
                      <span className="flex items-center">
                        <span className="w-5 mr-1">
                          {weatherIconMap[weather.condition]}
                        </span>
                        <span>
                          {formatTemperature(sensor.outdoor.temperature)}
                        </span>
                        {sensor.rainGauge
                        && sensor.rainGauge.hasOwnProperty('rain')
                        && sensor.rainGauge.rain > 0
                        && (
                          <span className="ml-1">
                            ({sensor.rainGauge.rain} mm)
                          </span>
                        )}
                      </span>
                    )}
                  </li>
                  <li className="mr-5">
                    {sensor.outdoor && sensor.outdoor.hasOwnProperty('humidity') && (
                      <span className="flex items-center">
                        <span className="w-5 mr-1">
                          <Droplet />
                        </span>
                        <span>
                          {sensor.outdoor.humidity}%
                        </span>
                      </span>
                    )}
                  </li>
                  <li className="mr-5">
                    {sensor.anemometer && sensor.anemometer.hasOwnProperty('gust_strength') && (
                      <span className="flex items-center">
                        {gustAngle !== null &&
                          <span className="w-5 mr-1">
                            <Navigation style={{
                              transform: `rotate(${gustAngle}deg)`
                            }} />
                          </span>
                        }
                        <span>
                          {sensor.anemometer.gust_strength} km/h
                        </span>
                      </span>
                    )}
                  </li>
                </ul>
              </div>
              <div className="relative py-2 px-4 text-right">
                <Thermostat {...climate} />
              </div>
              <div className="w-auto h-auto absolute" style={{
                top: '50%',
                left: '20%',
              }}>
                <div className="flex items-center justify-center bg-gray-100 w-full h-full text-xs rounded py-1 px-2 shadow">
                  <ul>
                    <li className="font-semibold">Living room</li>
                    <li>
                      {sensor.livingRoom && sensor.livingRoom.hasOwnProperty('temperature') && (
                        <span>{sensor.livingRoom.temperature}&deg;C</span>
                      )}
                    </li>
                    <li>
                      {sensor.livingRoom && sensor.livingRoom.hasOwnProperty('co2') && (
                        <span>{sensor.livingRoom.co2} ppm</span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-auto h-auto absolute" style={{
                top: '20%',
                left: '50%',
              }}>
                <div className="flex items-center justify-center bg-gray-100 w-full h-full text-xs rounded py-1 px-2 shadow">
                  <ul>
                    <li className="font-semibold">Attic</li>
                    <li>
                      {sensor.attic && sensor.attic.hasOwnProperty('temperature') && (
                        <span>{sensor.attic.temperature}&deg;C</span>
                      )}
                    </li>
                    <li>
                      {sensor.attic && sensor.attic.hasOwnProperty('co2') && (
                        <span>{sensor.attic.co2} ppm</span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Panels */}
            <div className="w-5/12 px-4 py-4 bg-gray-100">
              {/* Date and Time */}
              <div className="-mx-2 mb-4">
                <div className="px-2 text-right">
                  <DateTime date={new Date()} />
                </div>
              </div>

              {/* Weather forecast */}
              <div className="-mx-2 mb-4">
                <WeatherForecast {...weather} />
              </div>

              {/* Travel */}
              <div className="-mx-2 mb-4">
                <div className="px-2">
                  <Travel />
                </div>
              </div>


              {/* Lights */}
              <div className="flex -mx-2 mb-4">
                <div className="w-1/3 px-2">
                  <div className="bg-white py-2 px-4 rounded shadow text-center cursor-pointer">
                    Salon 1
                  </div>
                </div>

                <div className="w-1/3 px-2">
                  <div className="bg-white py-2 px-4 rounded shadow text-center cursor-pointer">
                    Salon 2
                  </div>
                </div>

                <div className="w-1/3 px-2">
                  <div className="bg-white py-2 px-4 rounded shadow text-center cursor-pointer">
                    Chambre
                  </div>
                </div>
              </div>

              {/* Switches */}
              <div className="flex -mx-2 mb-4">
                {Object.entries(switchPlug).map(([key, item], index) => (
                  <div key={index} className="w-1/2 px-2">
                    <SwitchPlug {...item} />
                  </div>
                ))}
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
    switchPlug: state.SwitchPlug,
    weather: state.Weather,
  }
}

export default connect(mapStateToProps)(Home)
