import React from 'react'

class FloorMap extends React.Component {
  constructor(props) {
    super(props)

    const {
      number,
    } = this.props

    this.colorIntensity = 200 + 200 * number
    this.marginTop = number === 3 ? 0 : -42

  }

  render() {
    const {
      number,
      children,
    } = this.props

    return (
      <div className="relative" style={{
        left: '50%',
        transform: 'translateX(-50%)',
        paddingTop: '70%',
        width: '62%',
        height: '0',
        marginTop: `${this.marginTop}%`,
        zIndex: number,
      }}>
        <div className={`absolute w-full h-full top-0 left-0 bg-gray-${this.colorIntensity}`} style={{
          transform: 'perspective(600px) rotateX(70deg)',
        }} />
        {children}
      </div>
    )
  }
}

export default FloorMap
