import fetch from 'node-fetch'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
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
            <div className="w-2/3 bg-gray-300 bg-center bg-no-repeat" style={{
              backgroundImage: 'url(/home.png)',
              backgroundSize: '90%',
            }}>
            </div>

            {/* Panels */}
            <div className="w-1/3 px-4 py-4 bg-gray-400">
              {/* Date and Time */}
              <div className="flex -mx-2 mb-4">
                <div className="w-full px-2 leading-tight">
                  <div className="text-3xl">9:14</div>
                  <div className="text-lg font-light">mardi 12 septembre</div>
                </div>
              </div>

              {/* Weather forecast */}

              {/* Lights */}


              {/* Plugs */}
              <div className="flex -mx-2">
                <div className="w-1/3 px-2">
                  <div className="bg-gray-500 h-12">
                    Camera ON/OFF
                  </div>
                </div>
                <div className="w-1/3 px-2">
                  <div className="bg-gray-500 h-12">
                    TV ON/OFF
                  </div>
                </div>
                <div className="w-1/3 px-2">
                  <div className="bg-gray-500 h-12">
                    Calendar
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
