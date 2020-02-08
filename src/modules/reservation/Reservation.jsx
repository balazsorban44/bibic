import React from "react"
import {FormSection, Send} from "components/Form"
import {toPrice} from "utils/language"
import RoomSelector from "./RoomSelector"
import PersonalDetails from "components/Form/PersonalDetails"
import ReservationDetails from "./ReservationDetails"
import Footnote from "./Footnote"

import "./reservation.sass"
import {useTranslation} from "react-i18next"
import useForm from "another-use-form-hook"
import useRoom from "hooks/data/useRoom"
import Text from "ui/Text"
import Section from "ui/Section"
import {getPrice} from "./data"


export default function Reservation() {

  const {fields, handleChange, handleSubmit, loading, inputs} = useForm({name: "reservation"})

  const {from, to, night, overlap, adults, children, mealPlan, message, ...r} = fields

  const roomId = parseInt(r.roomId.value, 10)


  const [rooms] = useRoom()
  const room = rooms[roomId-1]

  const price = getPrice(Object.entries(fields).reduce((acc, [key, e]) => ({...acc, [key]: e.value})), room)

  const maxPeople = room ? room.prices.metadata.maxPeople : 1

  const [t] = useTranslation("reservation")

  return(
    <Section id="foglalas" main title={t("title")}>
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <RoomSelector
          adults={adults.value}
          childrenProp={children.value}
          onChange={handleChange}
          roomId={roomId}
        />
        <FormSection title={t("personal-details.title")}>
          <PersonalDetails
            footnote={t("personal-details.footnote")}
            inputs={inputs}
          />
        </FormSection>
        <FormSection title={t("details.title")}>
          <ReservationDetails
            adults={adults}
            calendarProps={{roomId, from, to, nightError: night?.error, overlapError: overlap?.error}}
            children={children}
            inputs={inputs}
            maxPeople={maxPeople}
            mealPlan={mealPlan}
            message={message}
            onChange={handleChange}
          />
        </FormSection>
        <div className="submit-reservation">
          <Send
            disabled={loading}
            onClick={handleSubmit}
          >
            <div>
              <Text component="h3">
                {t("send")}
              </Text>
              <span className="footnote-asterix">
                {toPrice(price)}
              </span>
            </div>
          </Send>
        </div>
        <Footnote/>
      </form>
    </Section>
  )
}