import React, {useEffect} from 'react'
import {FormGroup, FormSection, Send} from 'components/shared/Form'
import PersonalDetails from 'components/shared/PersonalDetails'

import "./message.sass"
import {useTranslation} from 'react-i18next'
import {useForm} from 'hooks'
import {UPDATE_MESSAGE, RESET_MESSAGE} from 'db/actions'
import routes from 'utils/routes'
import {Input} from 'ui'
import {submit} from 'db/message'

const validations = ["name", "email", "mAddress", "mPhone", "content", "subject"]

export default ({history, location}) => {
  const [t] = useTranslation("message")

  const {
    loading,
    handleChange,
    handleSubmit,
    errors,
    fields: message
  } = useForm({
    name: "message",
    actions: {
      UPDATE: UPDATE_MESSAGE,
      RESET: RESET_MESSAGE
    },
    validate: {validations},
    submit,
    query: {
      push: history.push,
      root: routes.MESSAGE.substr(1),
      string: location.search
    }
  })

  useEffect(() => {window.scrollTo(0, 0)}, [])


  const {subject, content} = message

  return (
    <form
      action=""
      className="form message-form"
      onSubmit={handleSubmit}
    >
      <FormSection title={t("personal-details.title")}>
        <PersonalDetails
          address={{
            value: message.address,
            error: errors.address
          }}
          email={{
            value: message.email,
            error: errors.email,
            props: {required: true}
          }}
          footnote={t("personal-details.footnote")}
          name={{
            value: message.name,
            error: errors.name,
            props: {required: true}
          }}
          namespace="message"
          onChange={handleChange}
          phone={{
            value: message.phone,
            error: errors.phone
          }}
        />
      </FormSection>
      <FormSection title={t("details.title")}>
        <FormGroup title={t("details.subject.title")}>
          <select
            disabled={loading}
            id=""
            name="subject"
            onChange={({target: {value}}) => handleChange({subject: value})}
            value={subject}
          >
            <option value="eventHall">{t("details.subject.event-hall")}</option>
            <option value="fullHouse">{t("details.subject.full-house")}</option>
            <option value="special">{t("details.subject.special-request")}</option>
            <option value="other">{t("details.subject.other")}</option>
          </select>
        </FormGroup>
        <FormGroup
          className="message"
          title={t("details.content.title")}
        >
          <Input
            className="message-box"
            component="textarea"
            disabled={loading}
            error={errors.content}
            inputProps={{rows: 8}}
            name="content"
            onChange={handleChange}
            placeholder={t("details.content.placeholder")}
            value={content}
          />
        </FormGroup>
      </FormSection>
      <Send
        loading={loading}
        onClick={handleSubmit}
      >{t("send")}</Send>
    </form>
  )
}