import React, {Component, createContext} from 'react'
import {withRouter} from 'react-router-dom'
import {isQueryString, translate} from '../../utils/language'
import {
  submitReservation, getPrice, normalizeReservation
} from './reservation'
import {valueToState} from '../../utils/validate'
import {CLOUD_FUNCTION_BASE_URL} from '../../utils/constants'

import deepEqual from "deep-equal"

import {sendNotification} from "./notification"
import {submitMessage} from './message'
import {submitFeedback, subscribeToFeedbacks} from './feedback'
import {fetchData, subscribeToDatabase} from './fetch'
import {
  initialState, initialMessage, initialReservation
} from './initialState'
import {querystringDecode, querystring} from '@firebase/util'
import {eachDayOfInterval} from 'date-fns'

const Store = createContext()
/**
 * REVIEW: @see https://reactjs.org/docs/context.html#classcontexttype check this out to replace withStore
 * Makes the Store values available
 * @param {Component} WrappedComponent The component to pass the store values to
 * @returns {Component} Component with the Store values
 */
export const withStore = WrappedComponent =>
  class extends Component {
    render() {
      return (
        <Store.Consumer>
          {values => <WrappedComponent{...{...values, ...this.props}}/>}
        </Store.Consumer>
      )
    }
  }


export class Database extends Component {

  state = initialState

  // Fetch all initial data
  componentDidMount = async () => {
    try {

      const {
        PARAGRAPHS_REF, ROOMS_REF,
        ROOM_SERVICES_REF, GALLERIES_REF,
        FEEDBACKS_FS_REF, FEEDBACKS_REF
      } = await import("../../lib/firebase")

      subscribeToDatabase(PARAGRAPHS_REF, paragraphs => this.setState({paragraphs}), true)

      subscribeToDatabase(GALLERIES_REF, galleries => this.setState({galleries}), true)

      subscribeToDatabase(ROOM_SERVICES_REF, services => this.setState({roomServices: Object.entries(services)}))

      subscribeToDatabase(FEEDBACKS_REF,
        rooms => this.setState(({feedbacks}) => ({feedbacks: {...feedbacks, rooms}})))

      subscribeToFeedbacks(FEEDBACKS_FS_REF,
        all => this.setState(({feedbacks: prev}) => ({feedbacks: {...prev, all}})))

      const rooms = await fetchData(ROOMS_REF)
      this.setState({rooms})
      this.updateByURL(this.props.location.search, true)

    } catch (error) {
      sendNotification("error", "Adatbázis hiba. Kérjük vegye fel velünk a kapcsolatot.")
    }

  }


  componentDidUpdate({location: {search: prevSearch}}, {reservation: prevReservation}) {
    const {search} = this.props.location
    const {reservation} = this.state

    if (!deepEqual(prevReservation, reservation)) this.updatePrice()
    if (prevSearch !== search) {
      this.updateByURL(search)
      this.updatePrice()
    }
  }


  /*
   * ----------------------------------------------------------------------------
   * Reservation
   */

  handleSubmitReservation = () =>
    submitReservation(
      normalizeReservation(this.state.reservation),
      isReserving => this.setState({isReserving}),
      () => this.setState({reservation: initialReservation}),
      () => this.props.history.push(""),
      this.state.rooms
    )

  updatePrice = () => {
    const {rooms, reservation:{roomId}} = this.state
    const room = rooms.find(room => room.id === roomId)

    this.setState(({reservation}) => ({reservation: {...reservation,
      price: room ? getPrice(room, reservation) : 0}}))
  }

  /**
   * Updates the reservation either in the state or in the URL
   * If the key is not private, it adds the key=value pair to the URL
   * @param {string} key - reservation key
   * @param value - reservation value
   */
  updateReservation = (key, value) => {
    if (isQueryString(key)) {
      const {history} = this.props
      const search = querystringDecode(history.location.search)
      search[translate(key)] = key === "foodService" ? translate(value) : value
      history.push(`foglalas?${querystring(search)}`)
    } else this.setState(({reservation}) => ({reservation: {...reservation,
      [key]: value}}))
  }

  fetchOverlaps = async () => {
    try {
      let overlaps = await fetch(`${CLOUD_FUNCTION_BASE_URL}/getOverlaps?roomId=${this.state.reservation.roomId}`)
      overlaps = await overlaps.json()
      this.setState({overlaps:
        overlaps.reduce((acc, interval) => [...acc, ...eachDayOfInterval(interval)], [])})
    } catch (error) {
      sendNotification("error", error.message)
    }
  }


  /*
   * ----------------------------------------------------------------------------
   * Message
   */

  handleSubmitMessage = () =>
    submitMessage(
      {...this.state.message},
      isMessageLoading => this.setState({isMessageLoading}),
      () => this.setState({message: initialMessage}),
      () => this.props.history.push("")
    )

  updateMessage = (key, value) => {
    if (isQueryString(key)) {
      const {history} = this.props
      const search = querystringDecode(history.location.search)
      search[translate(key)] = key === "subject" ? translate(value) : value
      history.push(`uzenet?${ querystring(search)}`)
    } else this.setState(({message}) => ({message: {...message,
      [key]: value}}))
  }

  /*
   * ----------------------------------------------------------------------------
   * Feedback
   */
  handleSubmitFeedback = feedback =>
    submitFeedback(feedback, loading => this.setState({loading}))

  /*
   * ----------------------------------------------------------------------------
   * Routing
   */


  /**
   * Updates the state from the URL
   * @param {object} values
   * @param {boolean} [isInitial=false]
   */
  updateByURL = (queryString, isInitial=false) => {
    if (queryString) {
      const reservation = {...this.state.reservation}
      const message = {...this.state.message}
      queryString = querystringDecode(queryString)
      Object.entries(queryString).forEach(([key, value]) => {
        key = translate(key)
        value = key === "foodService" || key === "subject" ? translate(value) : value
        if (this.props.location.pathname.replace("/", "") === "uzenet") {
          message[key] = valueToState(key, value)
        } else {
          reservation[key] = valueToState(key, value)
        }
      })

      this.setState({reservation, message}, () => {
        const {reservation: {from}} = this.state
        if (isInitial) {
          this.setState({month: from})
        }
      })
    }
  }


  render() {
    return (
      <Store.Provider
        value={{
          submitReservation: this.handleSubmitReservation,
          submitMessage: this.handleSubmitMessage,
          submitFeedback: this.handleSubmitFeedback,
          updateReservation: this.updateReservation,
          updateMessage: this.updateMessage,
          fetchOverlaps: this.fetchOverlaps,
          ...this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }
}


export default withRouter(Database)