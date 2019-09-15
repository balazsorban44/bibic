import React, {useMemo} from "react"
import {FormSection, Send} from "components/Form"
import {toPrice} from "utils/language"
import RoomSelector from "./RoomSelector"
import RoomServices from "./RoomServices"
import PersonalDetails from "components/Form/PersonalDetails"
import ReservationDetails from "./ReservationDetails"
import Footnote from "./Footnote"

import "./reservation.sass"
import {useTranslation} from "react-i18next"
import useForm from "another-use-form-hook"
import {validators, mealPlans} from "utils/validate"
import {TOMORROW} from "utils/constants"
import getParams from "utils/getParams"
import useRoom from "hooks/data/useRoom"


const onNotify = (...args) => console.log(...args)
const onSubmit = (...args) => console.log(args)

export default function Reservation({location: {search}}) {
  const [t] = useTranslation("reservation")

  const params = getParams(search, "roomId")

  const initialState = useMemo( () => ({
    roomId: parseInt(params.roomId, 10),
    from: TOMORROW,
    to: TOMORROW,
    name: "",
    email: "",
    address: "",
    phone: "",
    message: "",
    adults: 1,
    children: [],
    mealPlan: mealPlans.BREAKFAST,
    price: 0
  }), [params.roomId])

  const [rooms] = useRoom()


  const {fields, handleChange, handleSubmit, loading, inputs} = useForm({
    initialState,
    validators,
    onNotify,
    onSubmit
  })


  const {from, to, adults, children, mealPlan, message, ...r} = fields

  const roomId = parseInt(r.roomId.value, 10)

  const room = rooms[roomId-1]

  const maxPeople = room ? room.prices.metadata.maxPeople : 1

  return(
    <form
      action=""
      className="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2>{t("title")}</h2>
      <RoomSelector
        adults={adults.value}
        childrenProp={children.value}
        onChange={handleChange}
        selected={roomId}
      />
      <RoomServices selected={roomId}/>
      <FormSection title={t("personal-details.title")}>
        <PersonalDetails
          footnote={t("personal-details.footnote")}
          inputs={inputs}
        />
      </FormSection>
      <FormSection title={t("details.title")}>
        <ReservationDetails
          inputs={inputs}
          maxPeople={maxPeople}
          onChange={handleChange}
          roomId={roomId}
          {...{from, to, adults, children, mealPlan, message}}
        />
      </FormSection>
      <Send
        disabled={loading}
        onClick={handleSubmit}
      >
        {t("send")}
        <span className="footnote-asterix">
          {toPrice(r.price.value)}
        </span>
      </Send>
      <Footnote/>
    </form>
  )
}