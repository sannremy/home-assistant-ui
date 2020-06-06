import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { formatDateTime, formatTemperature } from '../lib/text'
import WeatherForecast from '../components/weather-forecast'
import DateTime from '../components/date-time'
import SwitchPlug from '../components/switch-plug'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      sensor,
      switchPlug,
      weather,
    } = this.props

    const title = `Home`

    return (
      <div className="h-full">
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
              <div className="relative bg-gray-400 py-2 px-4">
                <ul className="flex items-center">
                  <li className="mr-4">
                    <span className="flex items-center">
                      {weather.hasOwnProperty('condition') && (
                        <span>
                          <img src={'/weather/' + weather.condition + '.svg'} className="w-8" />
                        </span>
                      )}
                      {sensor.outdoor && sensor.outdoor.hasOwnProperty('temperature') && (
                        <span>
                          {formatTemperature(sensor.outdoor.temperature)}
                        </span>
                      )}
                    </span>
                  </li>
                  <li className="mr-4">
                    {sensor.outdoor && sensor.outdoor.hasOwnProperty('humidity') && (
                      <span>
                        {sensor.outdoor.humidity}%
                      </span>
                    )}
                  </li>
                </ul>
              </div>
              <div className="w-auto h-auto absolute" style={{
                top: '50%',
                left: '20%',
              }}>
                <div className="flex items-center justify-center bg-gray-100 w-full h-full text-xs rounded py-1 px-2 shadow">
                  <span>20&deg;C</span>
                </div>
              </div>
              <div className="w-auto h-auto absolute" style={{
                top: '20%',
                left: '50%',
              }}>
                <div className="flex items-center justify-center bg-gray-100 w-full h-full text-xs rounded py-1 px-2 shadow">
                  <span>19&deg;C</span>
                </div>
              </div>
            </div>

            {/* Panels */}
            <div className="w-5/12 px-4 py-4 bg-gray-100">
              {/* Date and Time */}
              <div className="-mx-2 mb-4">
                <DateTime date={new Date()} />
              </div>

              {/* Weather forecast */}
              <div className="-mx-2 mb-4">
                <WeatherForecast {...weather} />
              </div>

              {/* Traffic */}


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
    sensor: state.Sensor,
    switchPlug: state.SwitchPlug,
    weather: state.Weather,
  }
}

export default connect(mapStateToProps)(Home)
