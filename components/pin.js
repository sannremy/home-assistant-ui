import React from 'react'

class Pin extends React.Component {
  render() {
    const {
      id,
      style,
      isSelected,
      isActive,
      onClick,
      children,
    } = this.props

    let bgColor = "bg-white"
    if (isActive) {
      bgColor = "bg-yellow-200"
    }

    if (isSelected) {
      bgColor = "bg-yellow-400"
    }

    return (
      <div
        onClick={onClick}
        className={`Pin Pin--${id}`}
        style={style}
      >
        <div className="relative">
          <div className={`Pin__content ${bgColor} relative z-10 w-12 h-12 p-2 rounded-full flex items-center justify-center`}>
            <div style={{
              transform: "translateY(0.1rem)",
            }}>
              {children}
            </div>
          </div>
          <div className={`Pin__arrow ${bgColor} z-0 absolute w-6 h-6`} />
        </div>
      </div>
    )
  }
}

export default Pin
