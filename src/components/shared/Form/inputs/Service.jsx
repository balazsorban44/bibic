import React, {memo} from 'react'

export default memo(({
  label, name, onChange, checked, value
}) =>
  <div className="service">
    <label htmlFor={value}>{label}</label>
    <input
      {...{
        name,
        value,
        checked
      }}
      id={value}
      onChange={({target: {name, value}}) => onChange({[name]: value})}
      type="radio"
    />
  </div>
)