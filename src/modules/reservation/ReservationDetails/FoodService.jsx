import React, {memo} from "react"
import {useTranslation} from "react-i18next"
import {Input} from "ui"

// REVIEW: Fetch service types dinamically?
export default memo(({onChange, value}) => {
  const [t] = useTranslation("reservation")

  const handleChange = value => {
    onChange({mealPlan: Object.values(value)[0]})
  }

  return (
    <>
      <Input
        className="service"
        inputProps={{checked: value==="breakfast"}}
        label={t("fields.breakfast")}
        name="breakfast"
        onChange={handleChange}
        type="radio"
        value="breakfast"
      />
      <Input
        checked={value==="halfBoard"}
        className="service"
        inputProps={{checked: value==="halfBoard"}}
        label={t("fields.half-board")}
        name="halfBoard"
        onChange={handleChange}
        type="radio"
        value="halfBoard"
      />
    </>
  )
})