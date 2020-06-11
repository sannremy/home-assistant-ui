import React from 'react'

class FloorMap extends React.Component {
  constructor(props) {
    super(props)

    const {
      number,
    } = this.props

    this.colorIntensity = 200 + 200 * number
    this.marginTop = number === 3 ? 0 : -116
  }

  render() {
    const {
      number,
      children,
    } = this.props

    return (
      <div className="relative" style={{
        // left: '50%',
        // transform: 'translateX(-50%)',
        // width: '60%',
        height: '33%',
        // paddingTop: 'calc(1000 / 685 * 100%)',
        // height: '100px',
        // marginTop: `${this.marginTop}%`,
        zIndex: number,
      }}>
        <div className="absolute w-full h-full top-0 left-0" style={{
          transform: 'perspective(600px) rotateX(70deg)',
        }}>
          <img className="w-full h-full" src={`/floor-${number}.svg`} />
        </div>
        <div className="absolute w-full h-full top-0 left-0">
          {children}
        </div>
      </div>
    )
  }
}

export default FloorMap
