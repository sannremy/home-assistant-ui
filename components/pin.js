import React from 'react'

class Pin extends React.Component {
  render() {
    const {
      id,
      style,
      isSelected,
      children,
    } = this.props

    return (
      <div
        className={`Pin Pin--${id} ${isSelected ? "bg-yellow-400" : "bg-white"}`}
        style={style}
      >
        <div className="relative">
          {children}
          <div className="Pin__arrow" />
        </div>
      </div>
    )
  }
}

export default Pin
