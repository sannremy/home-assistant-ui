import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import Weather from '../components/weather'
import DateTime from '../components/date-time'
import SwitchPlug from '../components/switch-plug'
import Thermostat from '../components/thermostat'
import Travel from '../components/travel'
import { Bulb } from '@styled-icons/boxicons-regular'
import WeatherForecast from '../components/weather-forecast'
import AreaSensor from '../components/area-sensor'
import homeConfig from '../home-config.json'

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
      <div className="h-full text-indigo-900">
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="h-full px-6 py-6">
          {/* Header */}
          <div className="h-auto flex -mx-3">
            <div className="w-4/12 px-3">
              <DateTime date={new Date()} />
            </div>

            <div className="w-8/12 px-3">
              <div className="flex items-start">
                <div className="mr-6">
                  <Weather
                    {...weather}
                    sensor={sensor.meteofrance}
                  />
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
          <div className="flex items-stretch -mx-3 mt-4">
            <div className="w-4/12 px-3">
              <div>
                <h1 className="text-2xl text-indigo-800">Thermostat</h1>
              </div>
              <div className="mt-2 inline-block">
                <Thermostat {...climate} />
              </div>
              <div className="mt-4">
                <ul>
                  {Object.keys(homeConfig.areas).map(area => (
                    <li key={area} className="mt-4">
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
              {/* <div className="mb-4">
                <ul className="flex">
                  <li className="flex items-center bg-gray-200 rounded px-2 py-1 mr-4">
                    <Droplet className="w-4 h-4 mr-1" />
                    <span>12&deg;</span>
                  </li>
                  <li className="flex items-center bg-gray-200 rounded px-2 py-1 mr-4">
                    <Droplet className="w-4 h-4 mr-1" />
                    <span>3 mm</span>
                  </li>
                  <li className="flex items-center bg-gray-200 rounded px-2 py-1 mr-4">
                    <Droplet className="w-4 h-4 mr-1" />
                    <span>4 km/h</span>
                  </li>
                  <li className="flex items-center bg-gray-200 rounded px-2 py-1">
                    <Droplet className="w-4 h-4 mr-1" />
                    <span>0,35 m</span>
                  </li>
                </ul>
              </div> */}

              <div className="mb-4">
                <div>
                  <h1 className="text-2xl text-indigo-800">Lights</h1>
                </div>
                <div className="flex mt-2 -mx-3">
                  <div className="rounded-lg bg-white p-6 w-1/3 mx-3">
                    <div className="w-12"><Bulb /></div>
                    <div className="mt-6 font-semibold">Room<br />Light 1</div>
                    <div className="mt-4 font-light">On</div>
                  </div>
                  <div className="rounded-lg bg-white p-6 w-1/3 mx-3">
                    <div className="w-12"><Bulb /></div>
                    <div className="mt-6 font-semibold">Room<br />Light 1</div>
                    <div className="mt-4 font-light">On</div>
                  </div>
                  <div className="rounded-lg bg-white p-6 w-1/3 mx-3">
                    <div className="w-12"><Bulb /></div>
                    <div className="mt-6 font-semibold">Room<br />Light 1</div>
                    <div className="mt-4 font-light">On</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div>
                  <h1 className="text-2xl text-indigo-800">Plugs</h1>
                </div>
                <div className="flex mt-2 -mx-3">
                  {Object.entries(switchPlug).map(([key, item], index) => (
                    <div key={index} className="w-1/3 mx-3">
                      <SwitchPlug {...item} />
                    </div>
                  ))}
                  <div className="w-1/3 mx-3">
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/12 px-3">
              <div className="mb-2">
                <h1 className="text-2xl text-indigo-800">Travel times</h1>
              </div>
              <Travel />
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
