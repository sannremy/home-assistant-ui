import React from 'react'

class Pin extends React.Component {
  render() {
    const {
      id,
      style,
      children,
    } = this.props

    return (
      <div className={`Pin Pin--${id}`} style={style}>
        <div className="relative">
          {children}
          <div className="Pin__arrow" />
        </div>
      </div>
    )
  }
}

export default Pin
