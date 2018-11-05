import moment from 'moment'
import QueryString from 'query-string'
import React, {Component, createContext} from 'react'
import {withRouter} from 'react-router-dom'
import {isQueryString, translate} from '../../utils/language'
import {
  submitReservation, getPrice, normalizeReservation
} from './reservation'
import {valueToState} from '../../utils/validate'
import {isEquivalent} from '../../utils/compare'
import {
  CLOUD_FUNCTION_BASE_URL, TODAY, TOMORROW
} from '../../utils/constants'

import {sendNotification} from "./notification"
import {submitMessage} from './message'
import {submitFeedback} from './feedback'
import {FEEDBACKS_REF} from '../../lib/firebase'

const Store = createContext()
/**
 * Makes the Store values available
 * @param {Component} WrappedComponent The component to pass the store values to
 * @returns {Component} Component with the Store values
 */
export const withStore = WrappedComponent =>
  class extends Component {
    render() {
      return (
        <Store.Consumer>
          {values =>
            <WrappedComponent
              {...{...values,
                ...this.props}}
            />
          }
        </Store.Consumer>
      )
    }
  }


const initialReservation = {
  roomId: null,
  from: TOMORROW.toDate(),
  to: TOMORROW.toDate(),
  name: "",
  email: "",
  address: "",
  tel: "",
  message: "",
  adults: 1,
  children: [],
  foodService: "breakfast",
  price: 0
}

const initialMessage = {
  content: "",
  subject: "other",
  address: "",
  name: "",
  email: "",
  tel: ""
}

export class Database extends Component {

  state = {
    hero: [],
    isReserving: false,
    isMessageLoading: false,
    tomorrow: TOMORROW,
    paragraphs: {},
    galleries: {},
    month: TODAY,
    reservation: initialReservation,
    message: initialMessage,
    rooms: [],
    roomServices: [],
    overlaps: [],
    feedbacks: {all: [], rooms: []}
  }


  // Fetch all initial data from Firebase.
  componentDidMount() {

    Promise.all([
      import("../../assets/images/hero/1.jpg"),
      import("../../assets/images/hero/2.jpg")
    ]).then(images => {
      this.setState({hero: images.map(({default: img}) => img)})
    })

    import("../../lib/firebase").then(({
      PARAGRAPHS_REF, ROOMS_REF, ROOM_SERVICES_REF, GALLERIES_REF, FEEDBACKS_FS_REF
    }) => {

      FEEDBACKS_FS_REF.where("accepted", "==", true).orderBy("timestamp", "asc").limit(20).onSnapshot(data => {
        const feedbacks = []
        data.forEach(feedback => {
          feedbacks.push(feedback.data())
        })
        this.setState(({feedbacks: prevFeedbacks}) => ({feedbacks: {...prevFeedbacks, all: feedbacks}}))
      })

      FEEDBACKS_REF.on("value", snap =>
        this.setState(
          ({feedbacks: prevFeedbacks}) => ({feedbacks: {...prevFeedbacks, rooms: snap.val()}})
        )
      )

      PARAGRAPHS_REF
        .on("value", snap => {
          const paragraphs = {}
          Object.entries(snap.val()).forEach(([paragraphType, paragraphList]) => {
            paragraphs[paragraphType] = Object.values(paragraphList)
              .sort((a, b) => a.order - b.order)
          })
          this.setState({paragraphs})
        })

      GALLERIES_REF
        .on("value", snap => {
          const galleries = {}
          Object.entries(snap.val()).forEach(([galleryType, galleryList]) => {
            galleries[galleryType] = Object.values(galleryList)
              .sort((a, b) => a.order - b.order)
          })
          this.setState({galleries})
        })


      ROOM_SERVICES_REF
        .on("value", snap =>
          this.setState({roomServices: Object.entries(snap.val())})
        )


      ROOMS_REF.once("value", snap => this.setState({rooms: snap.val()}))
        .then(() => this.updateByURL(this.props.location.search, true))
    })

  }


  componentDidUpdate({location: {search: prevSearch}}, {reservation: prevReservation}) {
    const {search} = this.props.location
    const {reservation} = this.state

    if (!isEquivalent(prevReservation, reservation)) this.updatePrice()
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
      const search = QueryString.parse(history.location.search)
      search[translate(key)] = key === "foodService" ? translate(value) : value
      history.push(`foglalas?${ QueryString.stringify(search)}`)
    } else this.setState(({reservation}) => ({reservation: {...reservation,
      [key]: value}}))
  }

  fetchOverlaps = async () => {
    try {
      let overlaps = await fetch(`${CLOUD_FUNCTION_BASE_URL}/getOverlaps?roomId=${this.state.reservation.roomId}`)
      overlaps = await overlaps.json()
      this.setState({overlaps: overlaps.map(({start, end}) => moment.range(start, end))})
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
      const search = QueryString.parse(history.location.search)
      search[translate(key)] = key === "subject" ? translate(value) : value
      history.push(`uzenet?${ QueryString.stringify(search)}`)
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
      queryString = QueryString.parse(queryString)
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
        let {reservation: {from}} = this.state
        if (isInitial) {
          from = moment(from)
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
