import React from "react"
import {useTranslation} from "react-i18next"
import {Input} from "ui"
import useForm from "another-use-form-hook"
import {mealPlans} from "utils/validate"

// REVIEW: Fetch service types dinamically?
const FoodService = () => {
  const {handleChange: _handleChange, fields} = useForm({name: "reservation"})


  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    _handleChange(e)
  }
  const [t] = useTranslation("reservation")
  return (
    <>
      <Input
        checked={fields.mealPlan.value === mealPlans.BREAKFAST}
        className="service"
        id={mealPlans.BREAKFAST}
        label={t("fields.breakfast")}
        local={false}
        name="mealPlan"
        onChange={handleChange}
        type="radio"
        value={mealPlans.BREAKFAST}
      />
      <Input
        checked={fields.mealPlan.value === mealPlans.HALF_BOARD}
        className="service"
        id={mealPlans.HALF_BOARD}
        label={t("fields.half-board")}
        local={false}
        name="mealPlan"
        onChange={handleChange}
        type="radio"
        value={mealPlans.HALF_BOARD}
      />
    </>
  )
}

export default FoodService