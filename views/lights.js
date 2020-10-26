import React from 'react'
import { connect } from 'react-redux'
import SwitchLight from '../components/switch-light'

class LightsView extends React.Component {
  render() {
    const {
      light,
    } = this.props

    return (
      <div>
        <div className="flex flex-wrap">
          {Object.entries(light).map(([key, item], index) => (
            <div key={`light-${item.name}-${item.state}`} className="w-auto mr-4">
              <SwitchLight {...item} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    light: state.Light,
  }
}

export default connect(mapStateToProps)(LightsView)
