import React from 'react'
import PersonalDetail from './PersonalDetail'
import {FormGroup} from '../../shared/Form'
import {sendNotification} from '../../db/notification'

export default ({
  personalDetails: {
    name, email, tel, address
  }, onChange, footnote="", disabled
}) =>
  <FormGroup footnote={`kötelező ${footnote}`}>
    <PersonalDetail
      disabled={disabled}
      errorMessage="Érvénytelen név!"
      hasFootnote
      label="teljes név"
      name="name"
      notification={sendNotification}
      onChange={onChange}
      value={name}
    />
    <PersonalDetail
      disabled={disabled}
      errorMessage="Érvénytelen e-mail cím!"
      hasFootnote
      label="e-mail cím"
      name="email"
      notification={sendNotification}
      onChange={onChange}
      value={email}
    />
    <PersonalDetail
      disabled={disabled}
      errorMessage="Érvénytelen telefonszám!"
      hasFootnote
      label="telefonszám"
      name="tel"
      notification={sendNotification}
      onChange={onChange}
      type="phone"
      value={tel}
    />
    <PersonalDetail
      disabled={disabled}
      errorMessage="Érvénytelen lakcím!"
      hasFootnote
      label="lakcím"
      name="address"
      notification={sendNotification}
      onChange={onChange}
      value={address}
    />
  </FormGroup>