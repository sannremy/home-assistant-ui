import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { toggleDarkMode } from '../actions'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
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
              <div className="bg-gray-500 w-10 h-10 absolute rounded-full p-1" style={{
                top: '80%',
                left: '20%',
              }}>
                <div className="flex items-center justify-center bg-gray-200 w-full h-full text-xs rounded-full p-1">
                  <span>20&deg;C</span>
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
                <div className="w-1/5 px-2">
                  <div className="text-center">
                    <div>dim</div>
                    <div>
                      <img src="/sun.svg" className="p-1" />
                    </div>
                    <div>28&deg;C</div>
                    <div className="text-xs">12,8 mm</div>
                  </div>
                </div>

                <div className="w-1/5 px-2">
                  <div className="text-center">
                    <div>lun</div>
                    <div>
                      <img src="/sun.svg" className="p-1" />
                    </div>
                    <div>28&deg;C</div>
                    <div className="text-xs">12,8 mm</div>
                  </div>
                </div>

                <div className="w-1/5 px-2">
                  <div className="text-center">
                    <div>mar</div>
                    <div>
                      <img src="/sun.svg" className="p-1" />
                    </div>
                    <div>28&deg;C</div>
                    <div className="text-xs">12,8 mm</div>
                  </div>
                </div>

                <div className="w-1/5 px-2">
                  <div className="text-center">
                    <div>mer</div>
                    <div>
                      <img src="/sun.svg" className="p-1" />
                    </div>
                    <div>28&deg;C</div>
                    <div className="text-xs">12,8 mm</div>
                  </div>
                </div>

                <div className="w-1/5 px-2">
                  <div className="text-center">
                    <div>jeu</div>
                    <div>
                      <img src="/sun.svg" className="p-1" />
                    </div>
                    <div>28&deg;C</div>
                    <div className="text-xs">12,8 mm</div>
                  </div>
                </div>
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
    darkMode: state.DarkMode,
  }
}

export default connect(mapStateToProps)(Home)
