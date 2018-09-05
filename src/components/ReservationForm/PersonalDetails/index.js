import React from 'react'
import {withStore} from '../../db'
import {toast} from "react-toastify"
import PersonalDetail from './PersonalDetail'
import {FormGroup} from '../../shared/Form'

const PersonalDetails = ({
  reservation: {
    name, email, tel, address
  }, updateReservation
}) =>
  <FormGroup footnote="kötelező">
    <PersonalDetail
      errorMessage="Érvénytelen név!"
      hasFootnote
      label="teljes név"
      name="name"
      notification={toast.error}
      onChange={updateReservation}
      value={name}
    />
    <PersonalDetail
      errorMessage="Érvénytelen e-mail cím!"
      hasFootnote
      label="e-mail cím"
      name="email"
      notification={toast.error}
      onChange={updateReservation}
      value={email}
    />
    <PersonalDetail
      errorMessage="Érvénytelen telefonszám!"
      hasFootnote
      label="telefonszám"
      name="tel"
      notification={toast.error}
      onChange={updateReservation}
      value={tel}
    />
    <PersonalDetail
      errorMessage="Érvénytelen lakcím!"
      hasFootnote
      label="lakcím"
      name="address"
      notification={toast.error}
      onChange={updateReservation}
      value={address}
    />
  </FormGroup>

export default withStore(PersonalDetails)