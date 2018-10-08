import React from 'react'
import 'react-daterange-picker/dist/css/react-calendar.css'
import {Link} from 'react-router-dom'
import ScrollLock from 'react-scrolllock'
import 'react-toastify/dist/ReactToastify.css'


import {withStore} from '../db'
import {FormSection, Send} from '../shared/Form'
import {toPrice} from '../../utils/language'
import RoomSelector from './RoomSelector'
import RoomServices from './RoomServices'
import PersonalDetails from './PersonalDetails'
import ReservationDetails from './ReservationDetails'
import Footnote from './Footnote'
import ReservationMessage from './ReservationMessage'


const ReservationForm = ({
reservation: {price}, isReserving, submitReservation
}) =>
  <div className={`reservation ${isReserving ? "is-reserving" : ""}`}>
    <span className="close-reservation">
      <Link to="/">✕</Link>
    </span>

    {!('ontouchstart' in document.documentElement) && <ScrollLock/>}

    <h2>Foglalás</h2>
    <form
      action=""
      className="reservation-form"
    >
      <RoomSelector/>
      <RoomServices/>
      <FormSection title="Személyi adatok">
        <PersonalDetails/>
      </FormSection>
      <FormSection title="Foglalás adatai">
        <ReservationDetails/>
      </FormSection>
      <FormSection title="Megjegyzés">
        <ReservationMessage/>
      </FormSection>
      <Send
        disabled={isReserving}
        onClick={submitReservation}
      >
        Küldés
        <span className="footnote-asterix">
          {toPrice(price)}
        </span>
      </Send>
      <Footnote/>
    </form>
  </div>

export default withStore(ReservationForm)