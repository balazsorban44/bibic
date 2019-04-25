import React from 'react'
import {Link} from "react-router-dom"
import People from './People'
import FoodService from './FoodService'
import {FormGroup} from 'components/shared/Form'
import Calendar from './Calendar'
import {useTranslation} from 'react-i18next'
import {Input} from 'ui'


export default ({onChange, values, maxPeople, errors}) => {
  const [t] = useTranslation("reservation")

  return (
    <>
      <FormGroup
        className="dates"
        footnote={t("details.calendar.footnote", {from: "14:00", to: "10:00"})}
        title={t("details.calendar.title")}
      >
        <Calendar
          errors={{from: errors.from, to: errors.to, period: errors.period}}
          from={values.from}
          onChange={onChange}
          to={values.to}
        />
      </FormGroup>
      <FormGroup
        footnote={t("details.people.footnote")}
        title={t("details.people.title", {maxPeople})}
      >
        <People
          adults={values.adults}
          children={values.children}
          maxPeople={maxPeople}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup
        className="services"
        footnote={
          <>
            {t("details.food.footnote.0")}
            <Link to="etelek?vissza=reservation">{t("details.food.footnote.1")} →</Link>
          </>
        }
        title={t("details.food.title")}
      >
        <FoodService
          onChange={onChange}
          value={values.mealPlan}
        />
      </FormGroup>
      <FormGroup
        className="message"
        title={t("details.message.title")}
      >
        <Input
          className="message-box"
          component="textarea"
          inputProps={{rows: 8}}
          name="message"
          onChange={onChange}
          placeholder={`(${t("details.message.placeholder")})`}
          value={values.message}
        />
      </FormGroup>
    </>
  )
}