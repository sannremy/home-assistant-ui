import React from 'react'
import Image from 'next/image'
import { connect } from 'react-redux'
import homeConfig from '../home-config.json'

import Weather from '../components/weather'
import DateTime from '../components/date-time'
import Thermostat from '../components/thermostat'
import WeatherForecast from '../components/weather-forecast'
import AreaSensor from '../components/area-sensor'
import Vigicrue from '../components/vigicrue'
import House from '../components/house'

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

    return (
      <div>
        <div className="">
          <House />
        </div>
        {/* Cols */}
        {/* <div className="flex items-stretch -mx-3 mt-3">
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
              <div className="relative House House--floor0-selected">
                <div className="Floor Floor--level0 transition duration-500 ease-in-out"></div>
                <div className="Floor Floor--level1 transition duration-500 ease-in-out"></div>
                <div className="Floor Floor--level2 transition duration-500 ease-in-out"></div>
              </div>
            </div>
          </div>
          <div className="w-3/12 px-3">
          </div>
        </div> */}
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
