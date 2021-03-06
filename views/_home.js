import React from 'react'
import { connect } from 'react-redux'
import homeConfig from '../home-config.json'

import Weather from '../components/weather'
import DateTime from '../components/date-time'
import Thermostat from '../components/thermostat'
import WeatherForecast from '../components/weather-forecast'
import AreaSensor from '../components/area-sensor'
import Vigicrue from '../components/vigicrue'

let interval = null

class HomeView extends React.Component {
  state = {
    currentDate: new Date(),
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
      weather,
    } = this.props

    let vigicrueHydro = []
    if (sensor.vigicrue && sensor.vigicrue.hasOwnProperty('vigicrue_hydro_observation')) {
      const hydroLength = sensor.vigicrue.vigicrue_hydro_observation.Serie.ObssHydro.length
      vigicrueHydro = sensor.vigicrue.vigicrue_hydro_observation.Serie.ObssHydro.slice(hydroLength - 50, hydroLength)
    }

    return (
      <div>
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

            </div>
          </div>
          <div className="w-3/12 px-3">
            <div>
              {vigicrueHydro.length && (
                <div className="py-2">
                  <Vigicrue data={vigicrueHydro} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    climate: state.Climate,
    sensor: state.Sensor,
    weather: state.Weather,
  }
}

export default connect(mapStateToProps)(HomeView)
