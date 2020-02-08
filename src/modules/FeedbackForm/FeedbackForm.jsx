import React, {useState, useEffect, useCallback} from "react"
import {useTranslation} from "react-i18next"

import errorState from "assets/icons/error.svg"
import successState from "assets/images/other/success-state.svg"
import {Send, FormGroup} from "components/Form"
import {Input} from "ui"
import useForm from "another-use-form-hook"
import {validators, rating as validateRating, reservationId as validateReservationId, lng as validateLng} from "utils/validate"
import Loading from "ui/Loading"
import getParams from "utils/getParams"
import "./feedback-form.sass"
import useLanguage from "hooks/data/useLanguage"
import Text from "ui/Text"


const FeedbackForm = ({location: {search}}) => {

  const [result, setResult] = useState({type: "", message: ""})
  const params = getParams(search, "reservationId", "rating", "lng")

  params.rating = parseInt(params.rating, 10) || 0
  const {rating, reservationId} = params
  const lng = validateLng(params.lng) ? params.lng : "en"
  useLanguage(lng)


  const onSubmit = useCallback(async ({fields, setLoading}) => {
    setLoading(true)
    try {
      const {FEEDBACKS_FS_REF, TIMESTAMP} = await import("lib/firebase")
      await FEEDBACKS_FS_REF.doc(reservationId).set({...fields, timestamp: TIMESTAMP})
      setResult({type: "success", message: reservationId})
    } catch (error) {
      setResult({type: "error", message: error.message})
    } finally {
      setLoading(false)
    }
  }, [reservationId])

  const {
    handleChange,
    handleSubmit,
    loading,
    fields,
    inputs
  } = useForm({
    initialState: {
      coffee: rating,
      cleanliness: rating,
      comfort: rating,
      food: rating,
      services: rating,
      staff: rating,
      content: "*".repeat(rating),
      lng
    },
    onNotify: (...args) => console.log(args[1]),
    validators,
    onSubmit
  })

  const oneClick = rating > 0 && rating < 6 && reservationId

  const [submitted, setSubmitted] = useState(false)
  useEffect(() => {
    if (!submitted) {
      setSubmitted(true)
      if ((rating && !validateRating(rating)) || !validateReservationId(reservationId))
        setResult({type: "error", message: "invalid rating or reservationId"})
      else if (oneClick) {
        handleSubmit()
      }
    }
  }, [handleSubmit, oneClick, rating, reservationId, submitted])

  const c = ["coffee", "cleanliness", "comfort", "food", "services", "staff"]
  const categories = Object.fromEntries(Object.entries(fields).filter(e => ~c.indexOf(e[0])))

  const [t] = useTranslation("feedbacks")
  return(
    result.type ?
      <FeedbackDone>
        <Text component="h1">
          {t(`form.${result.type}.text`, {message: result.message})}
        </Text>
        <img
          alt={t(`form.${result.type}.alt`)}
          className={result.type}
          src={result.type === "error" ? errorState : successState}
        />
      </FeedbackDone> :
      loading || oneClick ?
        <Loading fullPage/> :
        <form
          action=""
          className="form feedback-form"
          onSubmit={handleSubmit}
        >
          <h2>{t("form.title.0")} <span>({t("form.title.1")}: {reservationId})</span></h2>
          <FormGroup
            className="services"
            footnote={t("form.services.footnote")}
            title={t("form.services.title")}
          >
            {Object.entries(categories)
              .map(([key, value]) =>
                <RatingSlider
                  key={key}
                  name={key}
                  onClick={handleChange}
                  value={value}
                />
              )}
          </FormGroup>
          <FormGroup
            className="message"
            title={t("form.message.title")}
          >
            <Input
              {...inputs.text("content", {
                generateProps: ({error}) => ({
                  error,
                  label: t(`${error ? "errors" : "fields"}.content`)
                })
              })}
              className="message-box"
              component="textarea"
              disabled={loading}
              inputProps={{rows: 8}}
              placeholder={t("form.message.placeholder")}
            />
          </FormGroup>
          <Send {...inputs.submit} disabled={loading}>{t("send")}</Send>
        </form>
  )
}

export default FeedbackForm

export const RatingSlider = ({name, value: {value, error}, onClick}) => {
  const [t] = useTranslation("form")
  return (
    <div className="feedback-rating-slider">
      <div className={error ? "feedback-rating-slider-error" : ""}>
        <h3>
          {t(error ? "errors.rating" : `fields.${name}`)} ({value})
        </h3>
        <div
          className="rating-values"
          id="rating-values"
        >
          {Array.from({length: 5}).map((_, i) =>
            <RatingValue
              className={`rating-value ${i + 1 <= value ? "rating-value-active" : ""}`}
              key={i}
              name={name}
              onClick={onClick}
              value={i + 1}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const RatingValue = ({active, onClick, ...props}) => {

  const handleClick = e => {
    e.preventDefault()
    const {target: {name, value}} = e
    onClick({[name]: parseInt(value, 10)})
  }

  return (
    <button
      {...props}
      aria-selected={active}
      onClick={handleClick}
      role="option"
    >
      {props.value}
    </button>
  )
}


export const FeedbackDone = ({children}) =>
  <div className="feedback-done">
    {children}
  </div>