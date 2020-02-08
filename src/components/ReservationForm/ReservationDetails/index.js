import React from 'react'
import {Link} from "react-router-dom"
import People from './People'
import FoodService from './FoodService'
import {FormGroup} from '../../shared/Form'
import Calendar from './Calendar'
import Message from './Message'
import {useTranslation} from 'react-i18next'


const ReservationDetails = ({maxPeople}) => {
  const [t] = useTranslation()
  return (
    <>
      <FormGroup
        className="dates"
        footnote={t("reservation.dates.footnote")}
        title={t("reservation.dates.title")}
      >
        <Calendar/>
      </FormGroup>
      <FormGroup
        footnote={t("reservation.guests.footnote")}
        title={t("reservation.guests.title", {maxPeople})}
      >
        <People {...{maxPeople}}/>
      </FormGroup>
      <FormGroup
        className="services"
        footnote={
          <>
            {t("reservation.food.footnote.0")} <Link to="etelek?backTo=reservation">
              {t("reservation.food.footnote.1")} {"→"}</Link>
          </>
        }
        title={t("reservation.food.title")}
      >
        <FoodService/>
      </FormGroup>
      <FormGroup
        className="message"
        title={t("reservation.message.title")}
      >
        <Message/>
      </FormGroup>
    </>
  )
}

export default ReservationDetails