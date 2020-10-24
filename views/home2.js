import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="relative h-full text-indigo-900">
        <main className="h-full px-6 py-6">
          hello
        </main>
        <footer className="absolute bottom-0 w-full bg-white border-t border-indigo-200">
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
        </footer>
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
