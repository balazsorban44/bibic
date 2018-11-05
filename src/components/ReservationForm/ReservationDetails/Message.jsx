import React from 'react'
import {withStore} from '../../db'


const ReservationMessage = ({updateReservation, reservation: {message}}) =>
  <textarea
    name="message"
    onChange={({target: {name, value}}) => updateReservation(name, value)}
    placeholder="(pl.: étel egyeztetés, speciális kívánság, egyéb kérdés)"
    rows="8"
    type="text"
    value={message}
  />

export default withStore(ReservationMessage)