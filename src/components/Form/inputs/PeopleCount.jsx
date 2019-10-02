import React from "react"
import {useTranslation} from "react-i18next"
import Button from "ui/Button"

const PeopleCount = ({required, min, max, name, label, placeholder, value, onChange}) => {

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
        <Button
          circle
          name={name}
          onClick={handleChange}
          size="small"
          value={value - 1}
        >-</Button>
        <Button
          circle
          name={name}
          onClick={handleChange}
          size="small"
          value={value + 1}
        >
          +
        </Button>
      </div>
    </div>
  )
}

PeopleCount.defaultProps = {
  required: false,
  min: 0,
  max: 0,
  name: "",
  label: "",
  placeholder: "",
  value: 0
}

export default PeopleCount