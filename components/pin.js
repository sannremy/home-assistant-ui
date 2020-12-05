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
        className={`Pin Pin--${id}`}
        style={style}
      >
        <div className="relative">
          <div className={`Pin__content ${isSelected ? "bg-yellow-400" : "bg-white"} relative z-10 w-12 h-12 p-2 rounded-full flex items-center justify-center`}>
            <div style={{
              transform: "translateY(0.1rem)",
            }}>
              {children}
            </div>
          </div>
          <div className={`Pin__arrow ${isSelected ? "bg-yellow-400" : "bg-white"} z-0 absolute w-6 h-6`} />
        </div>
      </div>
    )
  }
}

export default Pin
