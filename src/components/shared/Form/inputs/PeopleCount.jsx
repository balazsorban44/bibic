import React from 'react'

export default ({
  required=false,
  min=0,
  max=0,
  name="",
  label="",
  placeholder="",
  value=0,
  onChange
}) => {
  
  const handleChange = ({target: {name, value: v}}) => {
    v = parseInt(v, 10)
    if (v < min) onChange({[name]: min})
    else if (v > max) onChange({[name]: max})
    else onChange({[name]: v})
  }

  return (
    <div className="input-box people-count">
      <label
        className={required ? "footnote-asterix": ""}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        {...{
          min,
          max,
          placeholder,
          name,
          value
        }}
        readOnly
        type="number"
      />
      <div className="number-controls">
        <button
          {...{name}}
          onClick={handleChange}
          value={value - 1}
        >-</button>
        <button
          {...{name}}
          onClick={handleChange}
          value={value + 1}
        >+</button>
      </div>
    </div>
  )
}