import React from 'react'
import {withStore} from '../../db'
import PersonalDetail from './PersonalDetail'
import {FormGroup} from '../../shared/Form'
import {sendNotification} from '../../db/notification'

const PersonalDetails = ({reservation: {
  name, email, tel, address
}, updateReservation}) =>
  <FormGroup footnote="kötelező">
    <PersonalDetail
      errorMessage="Érvénytelen név!"
      hasFootnote
      label="teljes név"
      name="name"
      notification={sendNotification}
      onChange={updateReservation}
      value={name}
    />
    <PersonalDetail
      errorMessage="Érvénytelen e-mail cím!"
      hasFootnote
      label="e-mail cím"
      name="email"
      notification={sendNotification}
      onChange={updateReservation}
      value={email}
    />
    <PersonalDetail
      errorMessage="Érvénytelen telefonszám!"
      hasFootnote
      label="telefonszám"
      name="tel"
      notification={sendNotification}
      onChange={updateReservation}
      type="phone"
      value={tel}
    />
    <PersonalDetail
      errorMessage="Érvénytelen lakcím!"
      hasFootnote
      label="lakcím"
      name="address"
      notification={sendNotification}
      onChange={updateReservation}
      value={address}
    />
  </FormGroup>

export default withStore(PersonalDetails)