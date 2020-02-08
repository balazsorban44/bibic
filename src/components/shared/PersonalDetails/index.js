import React from 'react'
import {useTranslation} from 'react-i18next'

import {FormGroup} from 'components/shared/Form'

import PersonalDetail from './PersonalDetail'

const options = {generateProps: p => p}

export default ({inputs, footnote="", ...props}) => {
  const [t] = useTranslation()

  return (
    <FormGroup footnote={`${t("form.required")} ${footnote}`}>
      <PersonalDetail {...inputs.text("name", options)} {...props} />
      <PersonalDetail {...inputs.email("email", options)} {...props} />
      <PersonalDetail {...inputs.tel("tel", options)} {...props} />
      <PersonalDetail {...inputs.text("address", options)} {...props} />
    </FormGroup>
  )
}