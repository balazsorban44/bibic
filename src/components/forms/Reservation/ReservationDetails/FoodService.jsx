import React, {memo} from 'react'
import {Service} from 'components/shared/Form/inputs'
import { useTranslation } from 'react-i18next';

// REVIEW: Fetch service types dinamically?
export default memo(({onChange, value}) => {
  const [t] = useTranslation("reservation")

  return (
    <>
      <Service
        checked={value==="breakfast"}
        label={t("fields.breakfast")}
        name="mealPlan"
        onChange={onChange}
        value="breakfast"
        />
      <Service
        checked={value==="halfBoard"}
        label={t("fields.half-board")}
        name="mealPlan"
        onChange={onChange}
        value="halfBoard"
      />
    </>
  )
})