import moment from 'moment'
import QueryString from 'query-string'
import React, {Component, createContext} from 'react'
import withRouter from 'react-router-dom/withRouter'
import {toast} from 'react-toastify'
import {PARAGRAPHS_REF, RESERVATIONS_FS_REF, ROOMS_REF, ROOM_SERVICES_REF, TIMESTAMP, GALLERIES_REF} from '../../lib/firebase'
import {isQueryString, translate} from '../../utils/language'
import {valid, valueToState} from '../../utils/validate'
import {isAvailable} from './reservation'


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
              {...{
                ...values,
                ...this.props
              }}
            />
          }
        </Store.Consumer>
      )
    }
  }


const today = moment()
const tomorrow = today.clone().add(1, "day").startOf("day")
const currentMonth = today.clone().startOf("month")

const initialReservation = {
  roomId: null,
  from: tomorrow,
  to: tomorrow.clone().add(1, "day"),
  name: "",
  email: "",
  address: "",
  tel: "",
  message: "",
  adults: 1,
  children: [],
  activeService: "breakfast",
  price: 0
}

class Database extends Component {

  state = {
    isReserving: false,
    tomorrow,
    paragraphs: {},
    galleries: {},
    month: today,
    overlaps: [],
    reservation: initialReservation,
    rooms: null,
    roomServices: null
  }


  // Fetch all initial data from Firebase.
  componentDidMount() {

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


    ROOM_SERVICES_REF.once("value", snap => this.setState({roomServices: snap.val()}))


    ROOMS_REF.once("value", snap => this.setState({rooms: snap.val()}))
      .then(() => this.updateByURL(this.props.location.search, true))
  }


  UNSAFE_componentWillReceiveProps({location: {search}}) {this.updateByURL(search)}


  /*
   * ----------------------------------------------------------------------------
   * Reservation
   */

  updatePrice = () => {}

  /**
   * Validates the reservation before sending it to the server
   * @param {object} reservation The reservation to be verified
   * @return {boolean}
   */
  isValidReservation = ({
    roomId, from, to, address, name, email, tel, message, adults, children
  }) => {

    const {rooms} = this.state
    const roomLength = Object.keys(rooms).length
    const maxPeople = roomId && rooms[roomId-1] && rooms[roomId-1].prices.metadata.maxPeople

    const error =
      !valid.roomId(roomId, roomLength) ? "Érvénytelen szobaszám" :
        !valid.name(name) ? "Érvénytelen név" :
          !valid.email(email) ? "Érvénytelen e-mail cím" :
            !valid.tel(tel) ? "Érvénytelen telefonszám" :
              !valid.address(address) ? "Érvénytelen lakcím" :
                !valid.from(from) ? "Legkorábbi érkezés holnap" :
                  !valid.to(to) ? "Legkorábbi távozás holnapután" :
                    !valid.period(from, to) ? "A foglalás legalább egy éjszakát kell, hogy tartalmazzon" :
                      !valid.message(message) ? "Érvénytelen üzenet" :
                        !valid.adults(adults) ? "Érvénytelen felnőtt" :
                          !valid.children(children) ? "Érvénytelen gyerek" :
                            !valid.peopleCount(adults, children, maxPeople) ? "A személyek száma nem haladhatja meg a szoba kapacitását" :
                              false

    if (error) {
      toast.error(
        <p style={{
          padding: ".5rem",
          fontSize: "1.2rem"
        }}
        >{error}<br/>
          <span style={{fontSize: "1rem"}}>
            Technikai hiba?
            <a
              href="mailto:hiba@bibicvedeghazak.hu"
              style={{
                color: "white",
                borderBottom: "1px solid white"
              }}
            >hiba@bibicvedeghazak.hu</a>
          </span>
        </p>, {autoClose: 5000})
      return false
    } else {
      return true
    }
  }

  submitReservation = e => {
    e.preventDefault()
    this.setState({isReserving: true})
    const reservation = Object.assign({}, this.state.reservation)
    const {
      from, to, message, roomId
    } = reservation
    reservation.from = moment(from).startOf("day").hours(14).valueOf()
    reservation.to = moment(to).startOf("day").hours(10).valueOf()
    reservation.message = message !== "" ? message : "Nincs üzenet"
    isAvailable(roomId, from, to).then(available => {

      if (available) {
        if (this.isValidReservation(reservation)) {
          RESERVATIONS_FS_REF
            .doc(`${moment(from).format("YYYYMMDD")}-sz${roomId}`)
            .set({
              ...reservation,
              lastHandledBy: "",
              timestamp: TIMESTAMP,
              handled: false
            })
            .then(() => {
              this.setState({
                isReserving: false,
                reservation: initialReservation,
                month: today.clone().toDate()
              })
              toast.success(
                <p style={{
                  padding: ".5rem",
                  fontSize: "1.2rem"
                }}
                >Foglalását rögzítettük. <br/>
                  <span style={{fontSize: "1rem"}}>
                  Néhány másodperc múlva visszakerül a főoldalra. További kérdésével fordulhat:<br/>
                    <a
                      href="mailto:info@bibicvendeghazak.hu"
                      style={{color: "white"}}
                    >info@bibicvendeghazak.hu</a><br/>
                    <a
                      href="tel:+36305785730"
                      style={{color: "white"}}
                    >+36 30 578 5730</a>
                  </span>
                </p>, {autoClose: 7500})

              setTimeout(() => this.props.history.push(""), 7500)
            })
            .catch(({
              code, message
            }) => {
              this.setState({isReserving: false})
              toast.error(
                <p style={{
                  padding: ".5rem",
                  fontSize: "1.2rem"
                }}
                >Hiba: {code} - {message}<br/>
                  <span style={{fontSize: "1rem"}}>
              Ha a probléma tartósan fennáll, jelezze itt: <a href={`mailto:hiba@bibicvedeghazak.hu?subject=Hibajelentés (${code})&body=${message}`}>hiba@bibicvedeghazak.hu</a>
                  </span>
                </p>, {autoClose: 10000})
            })
        } else {
          this.setState({isReserving: false})
        }
      } else {
        this.setState({isReserving: false})
        toast.error(
          <p
            style={{
              padding: ".5rem",
              fontSize: "1.2rem"
            }}
          >
          Sajnáljuk<br/>
            <span style={{fontSize: "1rem"}}>
            Adott intervallumban már van foglalásunk. Kérjük próbálkozzon másik dátumokkal, vagy másik szobával.
            </span>
          </p>, {autoClose: 10000})
      }
    })

  }


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
      const reservation = Object.assign({}, this.state.reservation)
      queryString = QueryString.parse(queryString)
      Object.entries(queryString).forEach(([key, value]) => {
        key = translate(key)
        value = key === "activeService" ? translate(value) : value
        reservation[key] = valueToState(key, value)
      })

      // /**
      //  * The following resets the dates when room change occurs.
      //  * @see handleRoomChange
      //  */
      // if (!Object.keys(queryString).includes(translate("from"))) reservation.from = undefined
      // if (!Object.keys(queryString).includes(translate("to"))) reservation.to = undefined

      this.setState({reservation}, () => {
        const {
          month, reservation: {roomId}
        } = this.state
        let {reservation: {from}} = this.state
        if (isInitial) {
          from = moment(from)
          this.setState({month: from})
          this.fetchOverlaps(roomId, from)
        } else {
          this.fetchOverlaps(roomId, month)
        }
        this.updatePrice()
      })
    }
  }


  /*
   * ----------------------------------------------------------------------------
   * Calendar events
   */

  /**
   * Fetches the corresponding overlap data.
   * The fetching returns a JSON Object with each day containing a boolean if the
   * room is already taken.
   * @param {number} roomId The id of the room of interest
   * @param {Moment} month The month of interest
   */

  fetchOverlaps = (roomId, month) => {
    if (!month.isBefore(currentMonth)
    // && this.isNewOverlaps(this.state.overlaps, month)
    ) {
      const url = "https://us-central1-bibic-vendeghazak-api.cloudfunctions.net/overlaps?"
      const date = month.clone().format("YYYY-MM")
      fetch(`${url}roomId=r${roomId}&date=${date}`)
        .then(res => res.json())
        .then(days => {
          this.setState(({overlaps}) => ({overlaps: [
            ...new Set(
              [
                ...overlaps,
                ...Object.keys(days)
              ]
            )
          ]}))

        })
        .catch(console.error)
    }
  }


  //REVIEW: Probably not working properly...?
  isNewOverlaps = (overlaps, month) => {
    const firstMonth = moment(month).format("YYYY-MM")
    const secondMonth = moment(month).add(1, "month").format("YYYY-MM")
    return !overlaps
      .filter(overlap =>
        overlap.includes(firstMonth) &&
        overlap.includes(secondMonth)
      ).length
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
      search[translate(key)] = key === "activeService" ? translate(value) : value
      history.push(`foglalas?${ QueryString.stringify(search)}`)
    } else this.setState(({reservation}) => ({reservation: {
      ...reservation,
      [key]: value
    }}))
  }

  /**
   * @param {Event} e
   */
  handleRoomChange = e => {
    e.preventDefault()
    const {value: roomId} = e.target

    this.setState({overlaps: {}},() =>
      this.fetchOverlaps(roomId, this.state.month))

    this.updateReservation("roomId", roomId)

    // /**
    //  * Resetting the the dates
    //  * also @see updateByURL
    //  */
    // this.updateReservation("from", undefined)
    // this.updateReservation("to", undefined)
  }


  handleDateSelect = ({
    start, end
  }) => {
    this.setState(({reservation}) => ({reservation: {
      ...reservation,
      from: start,
      to: end
    }}))
    const [fromFormatted, toFormatted] = [start, end].map(date => date.format("YYYY-MM-DD"))
    this.updateReservation("from", fromFormatted)
    this.updateReservation("to", toFormatted)
    toast.info(`Dátumok kiválasztva.`, {
      autoClose: 1000,
      hideProgressBar: true
    })
  }

  handleMonthChange = direction => {
    const {reservation: {roomId}} = this.state
    let {month} = this.state
    month = month.clone().add(direction, "month").startOf("month")
    if (!month.isBefore(currentMonth)) {
      this.setState({month})
      this.fetchOverlaps(roomId, month)
    }
  }

  render() {
    return (
      <Store.Provider
        value={{
          updateReservation: this.updateReservation,
          handleRoomChange: this.handleRoomChange,
          tileDisabled: this.tileDisabled,
          submitReservation: this.submitReservation,
          handleDateSelect: this.handleDateSelect,
          handleMonthChange: this.handleMonthChange,
          ...this.state
        }}
      >
        {this.props.children}
      </Store.Provider>
    )
  }
}


export default withRouter(Database)
