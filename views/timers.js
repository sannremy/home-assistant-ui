import React from 'react'
import { connect } from 'react-redux'
import Timer from '../components/timer'

class TimersView extends React.Component {
  render() {
    const {
      timer,
    } = this.props

    return (
      <div>
        <div className="flex flex-wrap">
          {Object.entries(timer).map(([key, item], index) => (
            <div key={`timer-${item.name}-${item.state}`} className="w-auto mt-4 mr-4">
              <Timer {...item} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    timer: state.Timer,
  }
}

export default connect(mapStateToProps)(TimersView)
