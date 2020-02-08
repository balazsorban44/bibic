import React from "react"
import {useTranslation} from "react-i18next"
import Button from "ui/Button"
import "./people-count.sass"
import {Input} from "ui"

const PeopleCount = ({min, max, name, value, required, onChange}) => {

  const handleChange = type => () => {
    let newValue = value
    switch (type) {
    case "decrease":
      newValue = value - 1
      if (newValue < min) return onChange({[name]: min})
      break
    case "increase":
      newValue = value + 1
      if (newValue > max) return onChange({[name]: max})
      break
    default: {}
    }
    onChange({[name]: newValue})
  }

  const [t] = useTranslation("form")

  return (
    <div className="people-count">
      <Input
        id={name}
        inputProps={{readOnly: true}}
        label={t(`fields.${name}`)}
        required={required}
        value={value}
      />
      <div className="number-controls">
        <Button
          circle
          name={name}
          onClick={handleChange("decrease")}
          size="small"
          type="button"
        >-</Button>
        <Button
          circle
          name={name}
          onClick={handleChange("increase")}
          size="small"
          type="button"
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