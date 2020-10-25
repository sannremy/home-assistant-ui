import React from 'react'
import { connect } from 'react-redux'
import homeConfig from '../home-config.json'
import Travel from '../components/travel'

class TravelsView extends React.Component {
  render() {
    const {
      sensor,
    } = this.props

    return (
      <div className="flex flex-wrap">
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
    )
  }
}

const mapStateToProps = state => {
  return {
    sensor: state.Sensor,
  }
}

export default connect(mapStateToProps)(TravelsView)
