import React, {useMemo, useEffect} from 'react'
import useForm from "another-use-form-hook"
import {useTranslation} from 'react-i18next'
import {FormGroup, FormSection, Send} from 'components/Form'

import "./message.sass"
import {validContent, addressRe, nameRe, emailRe, telRe} from 'utils/validate'
import {useFormNotification} from 'lib/notification'
import PersonalDetail from 'components/PersonalDetails/PersonalDetail'
import {useHistory} from 'react-router'
import Textarea from 'components/Form/inputs/Textarea'

const options = {generateProps: p => p}


const validators = (fields, submitting) => ({
  content: validContent(fields.content) || (!submitting && typeof fields.content === "string"),
  subject: ["eventHall", "fullHouse", "special", "other"].includes(fields.subject),
  address: addressRe.test(fields.address) || (!submitting && fields.address === ""),
  name: nameRe.test(fields.name) || (!submitting && fields.name === ""),
  email: emailRe.test(fields.email) || (!submitting && fields.email === ""),
  tel: telRe.test(fields.tel) || (!submitting && fields.tel === "")
})

const Message = () => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])


  const handleNotification = useFormNotification("message")

  const history = useHistory()

  const subject = new URLSearchParams(history.location.search.replace("?", "")).get("subject") || "other"

  const initialState = useMemo(() => ({
    content: "",
    subject,
    address: "",
    name: "",
    email: "",
    tel: ""
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  const [t, i18n] = useTranslation()

  const {loading, inputs, handleSubmit, handleChange} = useForm({
    initialState,
    validators,
    onNotify: handleNotification,
    onSubmit: async ({fields, notify, setLoading}) => {
      try {
        setLoading(true)
        const {MESSAGES_FS_REF, TIMESTAMP} = await import("lib/firebase")
        const message = {
          ...fields,
          timestamp: TIMESTAMP,
          lastHandledBy: "",
          accepted: false,
          language: i18n.language
        }
        console.log(message)

        // await MESSAGES_FS_REF.add(message)
        notify("submitSuccess")
      } catch (error) {
        notify("submitSuccess", error.message)
      } finally {
        setLoading(false)
      }
    }
  })

  const handleSelect = (e) => {
    const searchParams = new URLSearchParams(history.location.search.replace("?", ""))
    searchParams.set("subject", e.target.value)
    handleChange(e)
    history.replace(`?${searchParams}`)
  }

  return (
    <form
      className="form message-form"
      onSubmit={handleSubmit}
    >
      <FormSection title={t("form.personal-details")}>
        <FormGroup footnote={t("form.required")}>
          <PersonalDetail disabled={loading} {...inputs.text("name", options)}/>
          <PersonalDetail disabled={loading} {...inputs.email("email", options)}/>
          <PersonalDetail disabled={loading} {...inputs.tel("tel", options)}/>
          <PersonalDetail disabled={loading} {...inputs.text("address", options)}/>
        </FormGroup>
      </FormSection>
      <FormSection title={t("form.message")}>
        <FormGroup title={t("message.subject")}>
          <select {...inputs.select("subject")} disabled={loading} onChange={handleSelect} >
            <option value="eventHall">{t("message.subjects.eventHall")}</option>
            <option value="fullHouse">{t("message.subjects.entireHouse")}</option>
            <option value="special">{t("message.subjects.exclusiveDeal")}</option>
            <option value="other">{t("message.subjects.other")}</option>
          </select>
        </FormGroup>
        <FormGroup
          className="message"
          title={t("form.messageInput.details")}
        >
          <Textarea
            disabled={loading}
            inputs={inputs}
          />
        </FormGroup>
      </FormSection>
      <Send
        isLoading={loading}
        onClick={handleSubmit}
      >{t("form.send")}</Send>
    </form>
  )
}

export default Message


