import React from 'react'
import {withStore} from '../db'
import {FormGroup} from '../shared/Form'


const ReservationMessage = ({
  updateReservation, reservation: {message}
}) =>
  <FormGroup className="message">
    <textarea
      name="message"
      onChange={({target: {
        name, value
      }}) => updateReservation(name, value)}
      placeholder="(pl.: étel egyeztetés, speciális kívánság, egyéb kérdés)"
      rows="8"
      type="text"
      value={message}
    />
  </FormGroup>

export default withStore(ReservationMessage)