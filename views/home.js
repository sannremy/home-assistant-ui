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
      <div className="relative w-full h-full">
        <House
          sensors={sensor}
          climate={climate}
          light={light}
          ui={ui}
        />
        {/* Top right */}
        <div className="absolute top-0 right-0">
          <DateTime
            date={currentDate}
            weather={weather}
          />
          <div className="flex justify-end mt-4">
            <Horizon sun={sun} />
          </div>
        </div>
        {/* Bottom left */}
        <div className="absolute bottom-0 left-0">
          <div className="relative flex flex-col">
            oui
          </div>
        </div>
        {/* Bottom right */}
        <div className="absolute bottom-0 right-0">
          <div className="relative flex flex-col">
            oui
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
    weather: state.Weather,
    ui: state.UI,
    sun: state.Sun,
  }
}

export default connect(mapStateToProps)(HomeView)
