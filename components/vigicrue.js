import React from 'react'
import { formatDateTime, formatNumber } from '../lib/text'
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
          data: data.map(item => item.ResObsHydro),
          borderColor: "rgb(195, 218, 254)",
          backgroundColor: "rgba(195, 218, 254, 0.3)",
          lineTension: 0,
        }]
      },
      options: {
        animation: false,
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
            stacked: true,
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
      <div className="relative rounded-lg w-full h-32 overflow-hidden">
        <canvas ref={this.chartCanvas} className="absolute w-full h-full bottom-0" />
        <div className="absolute w-full bottom-0">
          <div className="text-center mb-4">

            <div className="flex items-center justify-center">
              <div className="w-6 h-6 mr-1 mb-1">
                <Water className="w-full h-full" />
              </div>
              <div className="font-semibold">
                {formatNumber(lastData.ResObsHydro)} m
              </div>
            </div>
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
      </div>
    )
  }
}

export default Vigicrue
