import React, {memo} from "react"
import {FormGroup} from "components/Form"
import {useTranslation} from "react-i18next"
import {Input} from "ui"


const fields = [
  {type: "text", name: "name"},
  {type: "email", name: "email"},
  {type: "tel", name: "phone"},
  {type: "text", name: "address"}
]

const PersonalDetails = ({namespace="form", inputs, footnote=""}) => {

  const [t] = useTranslation(namespace)

  return (
    <FormGroup footnote={footnote}>
      {fields.map(({type, name}) =>
        <Input
          {...inputs[type](name, {
            generateProps: ({name, error}) => ({
              error,
              label: t(`${error ? "errors" : "fields"}.${name}`)
            })
          })}
          key={name}
          placeholder={t(`fields.${name}`)}
          required
        />
      )}
    </FormGroup>
  )
}

export default memo(PersonalDetails)
