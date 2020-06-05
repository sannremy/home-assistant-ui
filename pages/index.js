import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      weather,
    } = this.props

    const title = `Home`

    return (
      <div className="h-full">
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="h-full">
          <div className="flex items-stretch h-full">
            {/* Home */}
            <div className="relative w-7/12 bg-gray-300 bg-center bg-no-repeat" style={{
              backgroundImage: 'url(/home.png)',
              backgroundSize: '90%',
            }}>
              <div className="w-10 h-10 absolute" style={{
                top: '50%',
                left: '20%',
              }}>
                <div className="flex items-center justify-center bg-gray-100 w-full h-full text-xs rounded-full p-1 shadow">
                  <span>20&deg;C</span>
                </div>
              </div>
              <div className="w-10 h-10 absolute" style={{
                top: '20%',
                left: '50%',
              }}>
                <div className="flex items-center justify-center bg-gray-100 w-full h-full text-xs rounded-full p-1 shadow">
                  <span>19&deg;C</span>
                </div>
              </div>
            </div>

            {/* Panels */}
            <div className="w-5/12 px-4 py-4 bg-gray-100">
              {/* Date and Time */}
              <div className="flex -mx-2 mb-4">
                <div className="w-full px-2 leading-tight text-right">
                  <div className="text-3xl">9:14</div>
                  <div className="text-lg font-light">mardi 12 septembre</div>
                </div>
              </div>

              {/* Weather forecast */}
              <div className="flex -mx-2 mb-4">
                {weather.forecast && weather.forecast.map(item => (
                  <div className="w-1/5 px-2">
                    <div className="text-center">
                      <div>{item.datetime.getDate()}/{item.datetime.getMonth() + 1}</div>
                      <div>
                        <img src={'/weather/' + item.condition + '.svg'} className="p-1" />
                      </div>
                      <div>{item.temperature}&deg;C</div>
                      {item.precipitation && (
                        <div className="text-xs">{item.precipitation} mm</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Traffic */}


              {/* Lights */}
              <div className="flex -mx-2 mb-4">
                <div className="w-1/3 px-2">
                  <div className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Salon 1
                  </div>
                </div>

                <div className="w-1/3 px-2">
                  <div className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Salon 2
                  </div>
                </div>

                <div className="w-1/3 px-2">
                  <div className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Chambre
                  </div>
                </div>
              </div>

              {/* Plugs */}
              <div className="flex -mx-2 mb-4">
                <div className="w-1/3 px-2">
                  <div className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    on/off
                  </div>
                </div>

                <div className="w-1/3 px-2">
                  <div className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    on/off
                  </div>
                </div>

                <div className="w-1/3 px-2">
                  <div className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    on/off
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    weather: state.Weather,
  }
}

export default connect(mapStateToProps)(Home)
