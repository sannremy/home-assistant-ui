import React from 'react'

class FloorMap extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      number,
      children,
    } = this.props

    return (
      <div className="relative" style={{
        paddingTop: 'calc(9 / 16 * 100%)',
        marginTop: `${number === 3 ? 0 : -40}%`,
        zIndex: number,
      }}>
        <img className="w-full h-full absolute top-0 left-0" src={`/floor-1.svg`} />
        <div className="absolute w-full h-full top-0 left-0">
          {children}
        </div>
      </div>
    )
  }
}

export default FloorMap
