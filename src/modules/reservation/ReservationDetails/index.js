import React from "react"
import {Link} from "react-router-dom"
import People from "./People"
import FoodService from "./FoodService"
import {FormGroup} from "components/Form"
import Calendar from "./Calendar"
import {useTranslation} from "react-i18next"
import {Input} from "ui"


export default ({onChange, roomId, from, to, adults, children, mealPlan, maxPeople, inputs}) => {
  const [t] = useTranslation("reservation")
  const [tForm] = useTranslation("form")

  return (
    <>
      <FormGroup
        className="dates"
        footnote={t("details.calendar.footnote", {from: "14:00", to: "10:00"})}
        title={t("details.calendar.title")}
      >
        <Calendar
          from={from}
          onChange={onChange}
          roomId={roomId}
          to={to}
        />
      </FormGroup>
      <FormGroup
        footnote={t("details.people.footnote")}
        title={t("details.people.title", {maxPeople})}
      >
        <People
          adults={adults.value}
          children={children.value}
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
          value={mealPlan.value}
        />
      </FormGroup>
      <FormGroup
        className="message"
        title={t("details.message.title")}
      >
        <Input
          {...inputs.text("message", {
            generateProps: ({name, error}) => ({
              key: name,
              error,
              label: tForm(`${error ? "errors" : "fields"}.${name}`)
            })
          })}
          className="message-box"
          component="textarea"
          inputProps={{rows: 6}}
          placeholder={t("details.message.placeholder")}
          required
        />
        {/* <Input
          className="message-box"
          component="textarea"
          inputProps={{rows: 8}}
          label={t("details.message.label") /*NOTE: This is set to an empty string in the locales. "" SHAME! 💩
          name="message"
          onChange={onChange}
          placeholder={`(${t("details.message.placeholder")})`}
          value={message.value}
        /> */}
      </FormGroup>
    </>
  )
}