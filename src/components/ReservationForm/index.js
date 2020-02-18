import React, {useEffect, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import useForm from 'another-use-form-hook'

import {TOMORROW} from "utils/env"
import {toLocalePrice} from 'utils/i18n'
import PersonalDetail from 'components/shared/PersonalDetails/PersonalDetail'
import {isAvailable, getPrice} from 'components/db/reservation'
import {FormGroup, FormSection, Send, Service, PeopleCount, Children} from 'components/shared/Form'
import {withStore} from 'components/db'

import RoomSelector from './RoomSelector'
import Footnote from './Footnote'
import "./reservation.sass"
import {format, isAfter, addDays} from 'date-fns'
import {useHistory} from 'react-router'
import {useFormNotification} from 'lib/notification'
import Calendar, {useOverlaps} from './ReservationDetails/Calendar'
import {Link} from 'react-router-dom'
import Textarea from 'components/shared/Form/inputs/Textarea'
import {valid, validContent, addressRe, nameRe, emailRe, telRe} from 'utils/validate'

const options = {generateProps: p => p}


const ReservationForm = ({rooms}) => {

  const [t, i18n] = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onNotify = useFormNotification("reservation")

  const history = useHistory()

  const urlSearchParams = new URLSearchParams(history.location.search.replace("?", ""))


  // Get default values from query string
  const roomId = parseInt(urlSearchParams.get("roomId"), 10) || 1
  const foodService = urlSearchParams.get("foodService") ?? "breakfast"
  const adults = parseInt(urlSearchParams.get("adults"), 10) || 1
  const from = new Date(urlSearchParams.get("from") || TOMORROW)
  const to = new Date(urlSearchParams.get("to") || TOMORROW)
  const ageGroups = ["0-6", "6-12"]
  const children = urlSearchParams.get("children")?.split("_")
    .filter(c => ageGroups.includes(c))
    ?? []

  const initialState = useMemo(() => ({
    roomId,
    from,
    to,
    name: "",
    email: "",
    address: "",
    tel: "",
    message: "",
    adults,
    children,
    foodService
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])


  const maxPeople = rooms?.[roomId - 1]?.prices.metadata.maxPeople || 2

  const overlaps = useOverlaps(roomId)

  const validators = (fields, submitting) => ({
    roomId: rooms.some(r => r.id === fields.roomId) || (!submitting || 0),

    address: addressRe.test(fields.address) || (!submitting && fields.address === ""),
    name: nameRe.test(fields.name) || (!submitting && fields.name === ""),
    email: emailRe.test(fields.email) || (!submitting && fields.email === ""),
    tel: telRe.test(fields.tel) || (!submitting && fields.tel === ""),

    period: submitting ? valid.period(fields.from, fields.to) : true,
    overlaps: true || !valid.overlaps(overlaps, fields.from, fields.to, submitting),
    from: isAfter(new Date(fields.from), TOMORROW),
    to: isAfter(new Date(fields.to), addDays(TOMORROW, 2)),


    adults: typeof fields.adults === "number" && fields.adults > 0,
    children: Array.isArray(fields.children) &&
    fields.children.every(child => ageGroups.includes(child)),
    peopleCount: (fields.adults + fields.children.length) <= maxPeople,
    foodService: ["breakfast", "halfBoard"].includes(fields.foodService),

    message: validContent(fields.message) || (!submitting && typeof fields.message === "string")
  })


  const {loading, inputs, handleSubmit, handleChange, fields} = useForm({
    initialState,
    validators,
    onNotify,
    onSubmit: async ({fields, setLoading, notify}) => {
      try {
        setLoading(true)
        const start = fields.from
        const end = fields.to
        const roomId = fields.roomId
        const price = getPrice({
          priceTable: rooms[fields.roomId -1],
          ...fields
        })

        const available = await isAvailable(roomId, {start, end})
        if (available !== true) {
          throw new Error(t("form.overlaps"))
        }

        const {RESERVATIONS_FS_REF, TIMESTAMP} = await import("../../lib/firebase")
        const reservation = {
          ...fields,
          id: `${format(fields.from, "yyyyMMdd")}-sz${roomId}`,
          roomId: [roomId],
          lastHandledBy: "",
          timestamp: TIMESTAMP,
          handled: false,
          archived: false,
          price,
          language: i18n.language
        }
        console.log(reservation)

        // await RESERVATIONS_FS_REF.add(reservation)
        // notify("submitSuccess")
        setLoading(false)
      } catch (error) {
        notify("submitError", error.message)
      } finally {
        setLoading(true)
      }
    }
  })


  const handleChangeWithQuery = (fields, validators) => {
    handleChange(fields, validators)
    Object.entries(fields).forEach(([key, value]) => {
      const _value = Array.isArray(value)
        ? value.join('_')
        : value instanceof Date
          ? format(value, "yyyy-MM-dd")
          : value
      urlSearchParams.set(key, _value)
    })
    history.replace(`?${urlSearchParams}`)
  }


  const price = toLocalePrice(getPrice({
    priceTable: rooms?.[roomId - 1]?.prices.table,
    from: fields.from.value,
    to: fields.to.value,
    adults: fields.adults.value,
    children: fields.children.value,
    foodService: fields.foodService.value
  }), i18n.language)

  return(
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <h2>{t("reservation.title")}</h2>
      <RoomSelector
        onRoomSelect={handleChangeWithQuery}
        roomId={fields.roomId.value}
      />
      <FormSection title={t("form.personal-details")}>
        <FormGroup footnote={t("reservation.required-for-invoice")}>
          <PersonalDetail disabled={loading} {...inputs.text("name", options)}/>
          <PersonalDetail disabled={loading} {...inputs.email("email", options)}/>
          <PersonalDetail disabled={loading} {...inputs.tel("tel", options)}/>
          <PersonalDetail disabled={loading} {...inputs.text("address", options)}/>
        </FormGroup>
      </FormSection>
      <FormSection title={t("reservation.reservation-details")}>
        <FormGroup
          className="dates"
          footnote={t("reservation.dates.footnote")}
          title={t("reservation.dates.title")}
        >
          <Calendar
            from={fields.from}
            onChange={handleChangeWithQuery}
            roomId={fields.roomId.value}
            to={fields.to}
          />
        </FormGroup>
        <FormGroup
          footnote={t("reservation.guests.footnote")}
          title={t("reservation.guests.title", {maxPeople})}
        >
          <PeopleCount
            inputProps={{
              placeholder: 1
            }}
            max={maxPeople - fields.children.value.length}
            min={1}
            name="adults"
            onChange={handleChangeWithQuery}
            value={fields.adults.value}
          />
          <Children
            hasFootnote
            max={maxPeople - fields.adults.value}
            name="children"
            onChange={handleChangeWithQuery}
            values={fields.children.value}
          />
        </FormGroup>
        <FormGroup
          className="services"
          footnote={
            <>
              {t("reservation.food.footnote.0")}
              <Link to="etelek?backTo=reservation">
                {t("reservation.food.footnote.1")} {"→"}
              </Link>
            </>
          }
          title={t("reservation.food.title")}
        >
          <Service
            inputs={inputs}
            onChange={handleChangeWithQuery}
            value="breakfast"

          />
          <Service
            inputs={inputs}
            onChange={handleChangeWithQuery}
            value="halfBoard"

          />
        </FormGroup>
        <FormGroup
          className="message"
          title={t("reservation.message.title")}
        >
          <Textarea
            disabled={loading}
            inputs={inputs}
            name="message"
            placeholder={t("reservation.message.placeholder")}
          />
        </FormGroup>
      </FormSection>
      <Send
        context="reservation"
        disabled={price <= 0}
        isLoading={loading}
        onClick={handleSubmit}
      >
        {t("form.send")}
        <span className="footnote-asterix">
          {price}
        </span>
      </Send>
      <Footnote/>
    </form>
  )
}

export default withStore(ReservationForm)