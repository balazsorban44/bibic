import React, {useContext, useMemo} from 'react'
import {Store} from 'db'
import {FormSection, Send} from 'components/shared/Form'
import {toPrice} from 'utils/language'
import RoomSelector from './RoomSelector'
import RoomServices from './RoomServices'
import PersonalDetails from 'components/shared/PersonalDetails'
import ReservationDetails from './ReservationDetails'
import Footnote from './Footnote'

import "./reservation.sass"
import {useTranslation} from 'react-i18next'
import {UPDATE_RESERVATION, RESET_RESERVATION} from 'db/actions'
import {submit} from 'db/reservation'
import {useForm} from 'hooks'
import routes from 'utils/routes'

const validations = ["period", "peopleCount"]

/** */
export default function Reservation({history, location}) {
  const [t] = useTranslation("reservation")

  const {rooms, reservation} = useContext(Store)

  const roomId = useMemo(() => parseInt(reservation.roomId, 10), [reservation.roomId])
  const room = useMemo(() => rooms[roomId-1], [rooms, roomId])
  const maxPeople = useMemo(() => (room && room.prices.metadata.maxPeople) || 1, [room])

  const {
    errors,
    handleChange,
    handleSubmit,
    loading
  } = useForm({
    name: "reservation",
    actions: {
      UPDATE: UPDATE_RESERVATION,
      RESET: RESET_RESERVATION
    },
    submit,
    validate: {
      validations,
      helpers: {maxPeople}
    },
    query: {
      string: location.search,
      push: history.push,
      root: routes.RESERVE.substr(1)
    }
  })


  return(
    <form
      action=""
      className="form"
      onSubmit={e => e.preventDefault()}
    >
      <h2>{t("title")}</h2>
      <RoomSelector
        onChange={handleChange}
        selected={roomId}
      />
      <RoomServices selected={roomId}/>
      <FormSection title={t("personal-details.title")}>
        <PersonalDetails
          address={{
            value: reservation.address,
            error: errors.address,
            props: {required: true}
          }}
          email={{
            value: reservation.email,
            error: errors.email,
            props: {required: true}
          }}
          footnote={t("personal-details.footnote")}
          name={{
            value: reservation.name,
            error: errors.name,
            props: {required: true}
          }}
          onChange={handleChange}
          phone={{
            value: reservation.phone,
            error: errors.phone,
            props: {required: true}
          }}
        />
      </FormSection>
      <FormSection title={t("details.title")}>
        <ReservationDetails
          errors={errors}
          maxPeople={maxPeople}
          onChange={handleChange}
          values={reservation}
        />
      </FormSection>
      <Send
        loading={loading}
        onClick={handleSubmit}
      >
        {t("send")}
        <span className="footnote-asterix">
          {toPrice(reservation.price)}
        </span>
      </Send>
      <Footnote/>
    </form>
  )
}