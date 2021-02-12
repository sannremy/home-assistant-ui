import React, { Children } from 'react'

class Switch extends React.Component {
  render() {
    const {
      isActive,
      onChange,
      id,
      name,
      children,
    } = this.props

    return (
      <div>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
          <input onChange={onChange} checked={isActive} type="checkbox" name={name} id={id} className="Switch absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
          <label htmlFor={id} className="Switch__label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
        {children && (
          <label htmlFor={id}>
            {children}
          </label>
        )}
      </div>
    )
  }
}

export default Switch
