import React from "react"
import {useTranslation} from "react-i18next"

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

  const [t] = useTranslation("form")

  return (
    <div className="input-box people-count">
      <label htmlFor={name}>
        {t(`fields.${name}`)}
        <input id={name} readOnly value={value}/>
      </label>
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