import React from 'react'
import { connect } from 'react-redux'
import DateTime from '../components/date-time'
import Horizon from '../components/horizon'
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
      light,
      weather,
      ui,
      sun,
    } = this.props

    const {
      currentDate,
    } = this.state

    return (
      <div className="relative">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="relative flex flex-col">
            <DateTime
              date={currentDate}
              weather={weather}
            />
            <div className="flex justify-end mt-4">
              <Horizon sun={sun} />
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <House
            sensors={sensor}
            climate={climate}
            light={light}
            ui={ui}
          />
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
    light: state.Light,
    weather: state.Weather,
    ui: state.UI,
    sun: state.Sun,
  }
}

export default connect(mapStateToProps)(HomeView)
