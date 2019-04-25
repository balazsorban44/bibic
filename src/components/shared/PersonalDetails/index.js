import React, {memo} from 'react'
import {FormGroup} from 'components/shared/Form'
import {useTranslation} from 'react-i18next'
import {Input} from "ui"

export default memo(({
  namespace="form",
  name, email, phone, address,
  onChange,
  footnote="", disabled
}) => {
  const [t] = useTranslation(namespace)

  return (
    <FormGroup footnote={footnote}>
      <Input
        disabled={disabled}
        error={name.error ? t("errors.name") : ""}
        label={t("fields.name")}
        name="name"
        onChange={onChange}
        value={name.value}
        {...name.props}
      />
      <Input
        disabled={disabled}
        error={email.error ? t("errors.email") : ""}
        label={t("fields.email")}
        name="email"
        onChange={onChange}
        value={email.value}
        {...email.props}
      />
      <Input
        disabled={disabled}
        error={phone.error ? t("errors.phone") : ""}
        label={t("fields.phone")}
        name="phone"
        onChange={onChange}
        value={phone.value}
        {...phone.props}
      />
      <Input
        disabled={disabled}
        error={address.error ? t("errors.address") : ""}
        label={t("fields.address")}
        name="address"
        onChange={onChange}
        value={address.value}
        {...address.props}
      />
    </FormGroup>
  )
})