import React, {useState} from "react"
import {Redirect} from "react-router"
import {useTranslation} from "react-i18next"
import useForm from "another-use-form-hook"


import {FormGroup, FormSection, Send} from "components/Form"
import PersonalDetails from "components/Form/PersonalDetails"
import {Input, Select} from "ui"
import "./message.sass"
import {validators, subjects} from "utils/validate"
import {useNotification} from "hooks"
import useScrollTo from "hooks/useScrollTo"

export const initialMessage = {
  content: "",
  subject: "other",
  address: "",
  name: "",
  email: "",
  phone: ""
}

const Message = () => {
  useScrollTo()

  const [success, setSuccess] = useState(false)


  const [t] = useTranslation("message")
  const [tForm] = useTranslation("form")

  const notify = useNotification()

  const {handleSubmit, inputs, loading} = useForm({
    initialState: initialMessage,
    validators,
    onNotify: (type, options) => {
      switch (type) {
      case "validationErrors":
        notify(
          "error",
          "message.validation",
          {fields: options.map(f => tForm(`fields.${f}`))}
        )
        break
      case "submitError":
        notify("error", "message.submit", options)
        break
      case "submitSuccess":
        notify("success", "message.submit", options)
        break
      default:
        break
      }
    },
    onSubmit: async ({fields, setLoading, notify}) => {
      setLoading(true)
      try {
        const {MESSAGES_FS_REF, TIMESTAMP} = await import("lib/firebase")
        const {id} = await MESSAGES_FS_REF.add({...fields, timestamp: TIMESTAMP})
        notify("submitSuccess", {id})
        setTimeout(() => {
          setSuccess(true)
        }, 7500)
      } catch (error) {
        notify("submitError", {message: error.message})
      } finally {
        setLoading(false)
      }
    }
  })


  return (
    <form
      action=""
      className="form message-form"
      onSubmit={handleSubmit}
    >
      {success ? <Redirect to="/"/> : null}
      <FormSection title={t("personal-details.title")}>
        <PersonalDetails
          footnote={t("personal-details.footnote")}
          inputs={inputs}
        />
      </FormSection>
      <FormSection title={t("details.title")}>
        <FormGroup className="message">
          <Select
            {...inputs.select("subject")}
            fullWidth
            label={t("details.subjects.title")}
            required
          >
            {Object.values(subjects).map(subject =>
              <option key={subject} value={subject}>{t(`details.subjects.${subject}`)}</option>
            )}
          </Select>
          <Input
            {...inputs.text("content", {
              generateProps: ({name, error}) => ({
                key: name,
                error,
                label: tForm(`${error ? "errors" : "fields"}.${name}`)
              })
            })}
            className="message-box"
            component="textarea"
            inputProps={{rows: 6}}
            placeholder={t("details.content.placeholder")}
            required
          />
        </FormGroup>
      </FormSection>
      <Send
        {...inputs.submit}
        disabled={loading}
      >
        {t("send")}
      </Send>
    </form>
  )
}

export default Message