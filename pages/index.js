import React from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'

import Navbar from '../components/navbar'
import HomeView from '../views/home'
import TravelsView from '../views/travels'
import TimersView from '../views/timers'

import { dispatch } from '../lib/store'
import { clickOutside } from '../actions'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.views = {
      home: <HomeView />,
      travels: <TravelsView />,
      timers: <TimersView />,
    }

    this.viewIndexes = Object.keys(this.views)

    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  handleClickOutside(event) {
    if (event.target.classList.contains("viewWrapper")) {
      dispatch(clickOutside({
        hasClickedOutside: true,
      }))
    } else {
      dispatch(clickOutside({
        hasClickedOutside: false,
      }))
    }
  }

  render() {
    const {
      navbar,
    } = this.props

    const title = `Home`
    const prefixPublicFolder = process.env.isProd ? '/local' : ''

    return (
      <div className="relative text-indigo-900 overflow-hidden">
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <meta name="description" content="Best Home Assistant UI" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />

          <meta name="application-name" content="Home Assistant UI" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Home Assistant UI" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="apple-touch-icon" sizes="180x180" href={`${prefixPublicFolder}/apple-touch-icon.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${prefixPublicFolder}/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${prefixPublicFolder}/favicon-16x16.png`} />
          <link rel="manifest" href={`${prefixPublicFolder}/manifest.json`} />
          <link rel="mask-icon" href={`${prefixPublicFolder}/safari-pinned-tab.svg" color="#5bbad5`} />
          <link rel="shortcut icon" href={`${prefixPublicFolder}/favicon.ico`} />
        </Head>
        <main className="relative w-screen h-screen transition-all duration-500 ease-in-out" style={{
          left: `-${this.viewIndexes.indexOf(navbar.view) * 100}%`,
        }}>
          {Object.entries(this.views).map(([id, component], index) => (
            <div
              key={id}
              className="absolute w-full h-full px-6 py-6 viewWrapper"
              style={{
                left: `${index * 100}%`,
              }}
              onClick={e => this.handleClickOutside(e)}
            >
              {component}
            </div>
          ))}
        </main>
        <Navbar {...navbar} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    navbar: state.Navbar,
  }
}

export default connect(mapStateToProps)(Index)
