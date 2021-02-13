import React, { Children } from 'react'

class RadioButton extends React.Component {
  render() {
    const {
      isChecked,
      onChange,
      id,
      name,
      value,
      children,
    } = this.props

    return (
      <div className="inline-flex items-center">
        <input checked={!!isChecked} onChange={onChange} id={id} name={name} value={value} type="radio" className="form-radio h-4 w-4 text-green-400" />
        <label htmlFor={id}>
          {children && (
            <span className="ml-2">
              {children}
            </span>
          )}
        </label>
      </div>
    )
  }
}

export default RadioButton
