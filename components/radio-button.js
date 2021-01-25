import React, { Children } from 'react'

class RadioButton extends React.Component {
  render() {
    const {
      isChecked,
      onChange,
      name,
      children,
    } = this.props

    return (
      <label className="inline-flex items-center mt-3">
        <input isChecked={isChecked} onChange={onChange} name={name} type="radio" className="form-radio h-5 w-5 text-red-600" />
        {children && (
          <span className="ml-2">
            {children}
          </span>
        )}
      </label>
    )
  }
}

export default RadioButton
