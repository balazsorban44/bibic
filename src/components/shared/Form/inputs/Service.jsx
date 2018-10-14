import React from 'react'

const Service = ({
  label, name, onChange, checked, value
}) => (
  <div className="service">
    <label htmlFor={value}>{label}</label>
    <input
      {...{
        name,
        value,
        checked
      }}
      id={value}
      onChange={({target: {name, value}}) => onChange(name, value)}
      type="radio"
    />
  </div>
)

export default Service