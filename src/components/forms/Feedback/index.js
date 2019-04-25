import React, {useState} from 'react'
import {Send, FormGroup} from '../../shared/Form'
import errorState from "assets/icons/error.svg"
import successState from "assets/images/other/success-state.svg"
import {Loading} from 'components/shared/Elements'
import {useTranslation} from 'react-i18next'
import {useForm} from 'hooks'
import {UPDATE_FEEDBACK, RESET_FEEDBACK} from 'db/actions'
import {submit} from 'db/feedback'
import routes from 'utils/routes'
import {Input} from 'ui'

const FeedbackForm = ({history, location}) => {
  const [t] = useTranslation("feedbacks")
  const [result, setResult] = useState()
  const {
    errors,
    handleChange, handleSubmit,
    loading,
    fields: {customId, coffee, cleanliness, comfort, food, services, staff, message}
  } = useForm({
    name: "feedback",
    actions: {
      UPDATE: UPDATE_FEEDBACK,
      RESET: RESET_FEEDBACK
    },
    submit: async (...args) => {
      const result = await submit(...args)
      setResult(result)
    },
    query: {
      push: history.push,
      root: routes.FEEDBACK_FORM.substr(1),
      string: location.search
    }
  })

  return(
    <>
    {result ?
      <FeedbackDone>
        <h1>{t(`form.${result}.text`)}</h1>
        <img
          alt={t(`form.${result}.alt`)}
          className={result}
          src={result === "error" ? errorState : successState}
        />
      </FeedbackDone> :
      loading ?
        <Loading fullPage/> :
        <form
          action=""
          className="form feedback-form"
          onSubmit={handleSubmit}
        >
          <h2>{t("form.title.0")} <span>({t("form.title.1")}: {customId})</span></h2>
          <FormGroup
            className="services"
            footnote={t("form.services.footnote")}
            title={t("form.services.title")}
          >
            {Object.entries({coffee, cleanliness, comfort, food, services, staff})
              .map(([key, value]) =>
                <RatingSlider
                  key={key}
                  name={key}
                  onChange={handleChange}
                  value={value}
                />
              )}
          </FormGroup>
          <FormGroup
            className="message"
            title={t("form.message.title")}
          >
            <Input
              className="message-box"
              component="textarea"
              disabled={loading}
              error={errors.message}
              inputProps={{rows: 8}}
              name="message"
              onChange={handleChange}
              placeholder={t("form.message.placeholder")}
              value={message}
            />
          </FormGroup>
          <Send onClick={handleSubmit}>{t("send")}</Send>
        </form>
    }
    </>
  )
}

export default FeedbackForm

export const RatingSlider = ({name, value, onChange}) => {
  const [t] = useTranslation("feedbacks")
  return (
    <div className="feedback-rating-slider">
      <h3>{t(name)}</h3>
      <ul>
        {Array(5).fill(null).map((_e, i) =>
          <RatingValue
            active={i + 1 <= value}
            key={i}
            name={name}
            onChange={onChange}
            value={i + 1}
          />
        )}
      </ul>
    </div>
  )
}

export const RatingValue = ({name, value, active, onChange}) =>
  <li
    className={`rating-value ${active ? "rating-value-active" : ""}`}
    onClick={() => onChange({[name]: value})}
  >
    {value}
  </li>


export const FeedbackDone = ({children}) =>
  <div className="feedback-done">
    {children}
  </div>