import React from 'react'

class Pin extends React.Component {
  render() {
    const {
      id,
      style,
      isSelected,
      onClick,
      children,
    } = this.props

    return (
      <div
        onClick={onClick}
        className={`Pin Pin--${id} ${isSelected ? "Pin--selected" : ""}`}
        style={style}
      >
        <div className="relative">
          <div className="Pin__content w-12 h-12 p-2 rounded-full flex items-center justify-center">
            <div style={{
              transform: "translateY(0.1rem)",
            }}>
              {children}
            </div>
          </div>
          <div className="Pin__arrow" />
        </div>
      </div>
    )
  }
}

export default Pin
