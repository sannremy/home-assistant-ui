import React from 'react'
import { formatDateTime, formatNumber } from '../lib/text'
import { Circle } from '@styled-icons/boxicons-solid'
import { Water } from '@styled-icons/boxicons-regular'
import Chart from 'chart.js'

class Vigicrue extends React.Component {
  constructor(props) {
    super(props)

    this.chartCanvas = React.createRef();
  }

  componentDidMount() {
    const {
      data,
    } = this.props

    const vigicrueChart = new Chart(this.chartCanvas.current, {
      type: 'line',
      data: {
        labels: data.map(item => {
          const date = new Date(item.DtObsHydro)
          return `${('' + date.getHours()).padStart(2, '0')}:${('' + date.getMinutes()).padStart(2, '0')}`
        }),
        datasets: [{
          label:  "Niveau d'eau",
          data: data.map(item => item.ResObsHydro),
          borderColor: "rgb(195, 218, 254)",
          backgroundColor: "rgba(195, 218, 254, 0.3)",
          lineTension: 0,
        }]
      },
      options: {
        elements: {
          point: false,
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            display: false,
          }],
          yAxes: [{
            display: false,
          }]
        },
      }
    });
  }

  render() {
    const {
      data,
    } = this.props

    const length = data.length
    const lastData = data[length - 1]

    return (
      <div className="relative">
        <div className="absolute w-full p-2">
          <div className="text-center">
            <div className="text-lg font-semibold">{formatNumber(lastData.ResObsHydro)} m</div>
            <div className="text-sm">
              {formatDateTime(new Date(lastData.DtObsHydro), {
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </div>
          </div>
        </div>
        <canvas ref={this.chartCanvas} className="absolute w-full h-full" />
      </div>
    )
  }
}

export default Vigicrue
