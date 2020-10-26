import React from 'react'
import { connect } from 'react-redux'
import homeConfig from '../home-config.json'

import Weather from '../components/weather'
import DateTime from '../components/date-time'
import Thermostat from '../components/thermostat'
import Travel from '../components/travel'
import WeatherForecast from '../components/weather-forecast'
import AreaSensor from '../components/area-sensor'
import Vigicrue from '../components/vigicrue'

import Chart from 'chart.js'

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

    const {
      sensor,
    } = this.props

    let vigicrueHydro = []
    if (sensor.vigicrue && sensor.vigicrue.hasOwnProperty('vigicrue_hydro_observation')) {
      const hydroLength = sensor.vigicrue.vigicrue_hydro_observation.Serie.ObssHydro.length
      vigicrueHydro = sensor.vigicrue.vigicrue_hydro_observation.Serie.ObssHydro.slice(hydroLength - 50, hydroLength)
    }

    var ctx = document.getElementById('vigicrueChart');
    var vigicrueChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: vigicrueHydro.map(item => {
          const date = new Date(item.DtObsHydro)
          return `${('' + date.getHours()).padStart(2, '0')}:${('' + date.getMinutes()).padStart(2, '0')}`
        }),
        datasets: [{
          label:  "Niveau d'eau",
          data: vigicrueHydro.map(item => item.ResObsHydro),
          borderColor: "rgb(195, 218, 254)",
          backgroundColor: "rgba(195, 218, 254, 0.3)",
        }]
      },
      options: {
        elements: {
          point: {
            radius: 0,
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            ticks: {
              maxRotation: 0,
              fontFamily: 'Montserrat, sans-serif',
              callback: function(value, index, values) {
                return index % 2 === 2 ? '' : value
              }
            },
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              maxRotation: 0,
              fontFamily: 'Montserrat, sans-serif',
            },
            gridLines: {
              display: false
            }
          }]
        },
      }
    });
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

    // Latest vigicrue
    // let vigicrueHydro = null
    // if (sensor.vigicrue && sensor.vigicrue.hasOwnProperty('vigicrue_hydro_observation')) {
    //   const hydroLength = sensor.vigicrue.vigicrue_hydro_observation.Serie.ObssHydro.length
    //   vigicrueHydro = sensor.vigicrue.vigicrue_hydro_observation.Serie.ObssHydro[hydroLength - 1]
    //   vigicrueHydro = {
    //     date: new Date(vigicrueHydro.DtObsHydro),
    //     level: vigicrueHydro.ResObsHydro,
    //   }
    // }

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
                <canvas id="vigicrueChart" />
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

            {/* <div>
              {vigicrueHydro && (
                <div className="py-2 last:border-0 border-b border-white">
                  <Vigicrue level={vigicrueHydro.level} date={vigicrueHydro.date} />
                </div>
              )}
            </div> */}
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
    light: state.Light,
    switchPlug: state.SwitchPlug,
    weather: state.Weather,
    timer: state.Timer,
  }
}

export default connect(mapStateToProps)(HomeView)
