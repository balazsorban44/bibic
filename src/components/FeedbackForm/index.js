import React, {Component} from 'react'
import {withStore} from '../db'
import {Send, FormGroup} from '../shared/Form'
import {querystringDecode} from '@firebase/util'
import {translate, isQueryString} from '../../utils/language'
import errorState from "../../assets/images/other/empty-state.svg"
import successState from "../../assets/images/other/success-state.svg"
import {Loading} from '../shared/Elements'
export class FeedbackForm extends Component {

  state = {
    success: false,
    error: null,
    feedback: {
      id: null,
      content: "",
      ratings: {
        coffee: 0,
        cleanliness: 0,
        comfort: 0,
        food: 0,
        services: 0,
        staff: 0
      }
    }
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0)
    const query = querystringDecode(this.props.location.search)
    let isOneClick
    const feedback = {}
    Object.entries(query).forEach(([key, value]) => {
      key = translate(key) || key
      if (!isOneClick && key === "one-click") {
        isOneClick = true
      }
      if (isQueryString(key)) {
        feedback[key] = "rating" === key ? parseInt(value, 10) : value
      }
    })

    // Populate ratings
    feedback.ratings = {}
    const ratings = Object.keys(this.state.feedback.ratings)
    ratings.forEach(key => {feedback.ratings[key] = feedback.rating || 0})
    delete feedback.rating

    if (isOneClick) {
      const {error, success} = await this.props.submitFeedback(feedback)
      this.setState({success, error})
    } else {
      this.setState({feedback})
    }
  }

  handleSubmitFeedback = async e => {
    e.preventDefault()
    const {error, success} = await this.props.submitFeedback(this.state.feedback)
    this.setState({success, error})
  }

  handleChange = ({target: {name, value}}) =>
    this.setState(({feedback}) => ({feedback: {...feedback, [name]: value}}))

  handleRateChange = (name, value) =>
    this.setState(({feedback}) => ({feedback: {...feedback,
      ratings: {...feedback.ratings,
        [name]: value}}}))

  render() {
    const {loading} = this.props

    const {
      feedback: {
        content, feedbackId, ratings
      },
      success, error
    } = this.state

    return(
      <>{error ?
        <FeedbackDone>
          <h1>Hiba történt.</h1>
          <img
            alt="sikertelen visszajelzes"
            src={errorState}
          />
        </FeedbackDone> :
        success ?
          <FeedbackDone>
            <h1>Köszönjük a visszajelzését.</h1>
            <img
              alt="sikeres visszajelzes"
              src={successState}
            />
          </FeedbackDone> :
          loading ?
            <Loading fullPage/> :
            <form
              action=""
              className="form feedback-form"
            >
              <h2>Visszajelzés <span>(foglalási azonosító: {feedbackId})</span></h2>
              <FormGroup
                className="services"
                footnote="1 = legrosszabb, 5 = legjobb"
                title="szolgáltatásaink"
              >
                {Object.entries(ratings).map(([key, value]) =>
                  <RatingSlider
                    key={key}
                    name={key}
                    onChange={this.handleRateChange}
                    value={value}
                  />
                )}
              </FormGroup>
              <FormGroup
                className="message"
                title="üzenet"
              >
                <textarea
                  name="content"
                  onChange={this.handleChange}
                  placeholder="Tisztelt Bíbic vendégházak... (min. 40 karakter)"
                  rows="4"
                  type="text"
                  value={content}
                />
              </FormGroup>
              <Send onClick={this.handleSubmitFeedback}>Küldés</Send>
            </form>
      }
      </>
    )
  }
}

export default withStore(FeedbackForm)


export const RatingSlider = ({
  name, value, onChange
}) =>
  <div className="feedback-rating-slider">
    <h3>{translate(name)}</h3>
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

export const RatingValue = ({
  name, value, isActive, onChange
}) =>
  <li
    className={`rating-value ${isActive ? "rating-value-active" : ""}`}
    onClick={() => onChange(name, value)}
  >
    {value}
  </li>


export const FeedbackDone = ({children}) =>
  <div className="feedback-done">
    {children}
  </div>