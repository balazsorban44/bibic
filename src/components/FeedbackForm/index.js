import React, {useMemo, useEffect} from 'react'
import {Send, FormGroup} from 'components/shared/Form'
import errorState from "assets/images/other/empty-state.svg"
import successState from "assets/images/other/success-state.svg"
import {useTranslation} from 'react-i18next'
import {CLOUD_FUNCTION_BASE_URL} from 'utils/constants'
import {useFormNotification} from 'lib/notification'
import useForm from 'another-use-form-hook'
import {useHistory} from 'react-router'
import {validContent} from 'utils/validate'
import Textarea from 'components/shared/Form/inputs/Textarea'


const imgSources = {
  error: errorState,
  success: successState
}

const ratingCategories = ["coffee", "cleanliness", "comfort", "food", "services", "staff"]
const validRating = (submitting) => ([key, value]) =>
  ratingCategories.includes(key) && ((value >= submitting ? 1 : 0) && value < 6)

const validators = (simpleClick) => (fields, submitting) => ({
  customId: /^sz-.*/.test(fields.customId),
  id: typeof fields.id === "string",
  content: simpleClick || validContent(fields.content),
  ratings: Object.entries(fields.ratings).every(validRating(submitting))
})

const FeedbackForm = () => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const onNotify = useFormNotification("feedback")
  const history = useHistory()

  const params = new URLSearchParams(history.location.search.replace("?", ""))

  const customId = params.get("customId")
  const id = params.get("id")
  const simpleClick = params.has("one-key")
  const defaultRating = simpleClick ? parseInt(params.get("rating"), 10) : 0
  const initialState = useMemo(() => ({
    customId,
    id,
    content: "",
    ratings: {
      coffee: defaultRating,
      cleanliness: defaultRating,
      comfort: defaultRating,
      food: defaultRating,
      services: defaultRating,
      staff: defaultRating
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  const [t, i18n] = useTranslation()

  const {loading, fields, inputs, handleChange, handleSubmit} = useForm({
    initialState,
    validators: validators(simpleClick),
    onNotify,
    onSubmit: async ({fields, notify, setLoading}) => {
      const searchParams = new URLSearchParams(history.location.search.replace("?", ""))
      try {
        setLoading(true)
        const url = new URL("/reservationExists", CLOUD_FUNCTION_BASE_URL)
        url.searchParams.set("id", fields.id)
        url.searchParams.set("customId", fields.customId)

        const response = await fetch(url.toString())
        const reservationExists = await (response).json()

        if (reservationExists) {
          const {ratings, customId, content} = fields

          const avg = Math.floor(Object.values(ratings).reduce((a,e) => a+e)/Object.keys(ratings).length)

          const {FEEDBACKS_FS_REF, TIMESTAMP} = await import("../../lib/firebase")
          const feedback = {
            ratings,
            roomId: customId.split("sz")[1].split("-").map(r => parseInt(r, 10)),
            id: customId,
            content: content || "*".repeat(avg),
            timestamp: TIMESTAMP,
            accepted: false,
            language: i18n.language
          }
          console.log(feedback)

          // await FEEDBACKS_FS_REF.doc(fields.id).set(feedback)
          searchParams.set("state", "success")
        } else {
          // There is no corresponding reservation to this feedback.
          throw Error(t("notification.no-reservation-found"))
        }
      } catch (error) {
        searchParams.set("state", "error")
        notify("submitError", error.message)
      } finally {
        history.push(`?${searchParams}`)
        setLoading(false)
      }
    }
  })

  const handleRatingSlider = (name, value) => {
    const newRatings = {...fields.ratings.value}
    newRatings[name] = value
    handleChange({ratings: newRatings})
  }


  const state = new URLSearchParams(history.location.search.replace("?", "")).get("state")

  if (state === "success" || state === "error") {
    return (
      <div className="feedback-done">
        <h1>{t(`feedback.${state}.title`)}</h1>
        <img
          alt={t(`feedback.${state}.alt`)}
          src={imgSources[state]}
        />
      </div>
    )
  }


  return (
    <form
      className="form feedback-form"
      onSubmit={handleSubmit}
    >
      <h2>{t("feedback.title")} <span>{t("feedback.subtitle", {id: fields.customId.value})}</span></h2>
      <FormGroup
        className="services"
        footnote={t("feedback.our-services.footnote")}
        title={t("feedback.our-services.title")}
      >
        {Object.entries(fields.ratings.value).map(([key, value]) =>
          <RatingSlider
            key={key}
            name={key}
            onChange={handleRatingSlider}
            value={value}
          />
        )}
      </FormGroup>
      <FormGroup
        className="message"
        title={t("form.message")}
      >
        <Textarea
          disabled={loading}
          inputs={inputs}
          rows="4"
        />
      </FormGroup>
      <Send disabled={loading} onClick={handleSubmit}>{t("form.send")}</Send>
    </form>
  )
}

export default FeedbackForm


export const RatingSlider = ({name, value, onChange}) => {
  const [t] = useTranslation()
  return (
    <div className="feedback-rating-slider">
      <h3>{t(`feedback.services.${name}`)}</h3>
      <ul>
        {Array(5).fill(null).map((_e, i) =>
          <RatingValue
            isActive={i + 1 <= value}
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

export const RatingValue = ({name, value, isActive, onChange}) =>
  <li
    className={`rating-value ${isActive ? "rating-value-active" : ""}`}
    onClick={() => onChange(name, value)}
  >
    {value}
  </li>