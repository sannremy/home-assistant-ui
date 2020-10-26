import React from 'react'
import { connect } from 'react-redux'
import SwitchPlug from '../components/switch-plug'

class PlugsView extends React.Component {
  render() {
    const {
      switchPlug,
    } = this.props

    return (
      <div>
        <div className="flex flex-wrap">
          {Object.entries(switchPlug).map(([key, item], index) => (
            <div key={`plug-${item.name}-${item.state}`} className="w-auto mt-4 mr-4">
              <SwitchPlug {...item} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    switchPlug: state.SwitchPlug,
  }
}

export default connect(mapStateToProps)(PlugsView)
