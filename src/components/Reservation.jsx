import React, { Component, Fragment } from 'react'
import QueryString from 'query-string'
import {Link} from 'react-router-dom'
import Calendar from 'react-calendar'
import ScrollLock from 'react-scrolllock'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment'
import 'moment/locale/hu'

import {ROOM_SERVICES_REF, ROOMS_REF} from '../lib/firebase'

import {FormSection, FormGroup} from './Form'
import {PersonalDetail, Date, PeopleCount, Children, Service} from './Form/inputs'
import {nameRe, emailRe, telRe} from '../utils/validate'


const queryKeysTranslation = {
  roomId: "szoba",
  szoba: "roomId",
  adults: "felnott",
  felnott: "adults",
  children: "gyerek",
  gyerek: "children",
  from: "erkezes",
  erkezes: "from",
  to: "tavozas",
  tavozas: "to",
  activeService: "ellatas",
  ellatas: "activeService"
import {Loading} from './shared/Elements'
}





export default class Reservation extends Component {

  state = {
    reservation: {
      roomId: "",
      from: null, to: null,
      name: "", email: "", address: "", tel: "",
      message: "",
      adults: 1, children: [],
      activeService: null,
    },
    today: null,
    rooms: null,
    services: null,
    overlaps: {},
    month: moment(),
    showRange: true,
    notification: null
  }
  

  componentDidMount() {
    
    ROOM_SERVICES_REF.on("value", snap => {
      this.setState({services: snap.val()})
    })
    ROOMS_REF.on("value", snap => {
      this.setState({rooms: snap.val()})
    })
    this.updateByRoute(this.props.location.search)
  }


  /**
   * Fetches the corresponding overlap data.
   * The fetching returns a JSON Object with each day containing a beforeNoon
   * and an afterNoon Boolean. 
   * @param {number} roomId The id of the room of interest
   * @param {moment} month The month to check for overlaps
   * @param {boolean} [isInitial=] is the function called the first time
   */
  isOverlapping = (roomId, month, isInitial=false) => {
    month = month.format("YYYY-MM")
    const url = "https://us-central1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?"
    if (isInitial || this.state.month !== month || this.state.reservation.roomId !== roomId) {
      fetch(`${url}roomId=${roomId}&month=${month}`)
        .then(res => res.json())
        .then(overlaps => {
          this.setState({
            overlaps, month
          })
        })
        .catch(e => console.error(e))
    }
  }

  translateQueryKeys = queryObject => {
    const newObject = {}
    Object.keys(queryObject).forEach(name => {
      newObject[queryKeysTranslation[name]] = queryObject[name]
    })
  
    return newObject
  }
  
  updateByRoute = (values) => {
    const today = moment().toDate()
    if (values) {
      values = this.translateQueryKeys(queryString.parse(values))
      let {   roomId, 
              from, to,
              adults,
              children
            } = values
            
            
      values.roomId = parseInt(roomId, 10)
      
      
      values.from = moment(from).toDate()
      values.to = moment(to).toDate()
      values.adults = parseInt(adults, 10)

      if (children === undefined) {
        values.children = []
      } else {
        values.children = !Array.isArray(children) ? [children] : children
      }
      
      this.isOverlapping(roomId, from ? moment(from) : moment(), true)
      this.setState({
        reservation: {
          ...this.state.reservation,
          ...values
        }
      })
    } else {
      this.setState({
        today, 
        reservation: {
          ...this.state.reservation,
          from: today,
          to: today
        }
      })
    }
  }
  



  // Calendar events
  handleActiveDateChange = ({activeStartDate}) => {
    this.setState({showRange: false})
    this.isOverlapping(this.state.reservation.roomId, moment(activeStartDate))
  }

  handleDatesChange = dates => {
    const from = moment(dates[0]).format("YYYY-MM-DD")
    const to = moment(dates[1]).format("YYYY-MM-DD")
    
    this.setState({
      showRange: true,
      reservation: {
        ...this.state.reservation,
        from: moment(dates[0]).toDate(),
        to: moment(dates[1]).toDate()
      }
    })

    this.updateRoute("from", from)
    this.updateRoute("to", to)
    this.showNotification("info",   "Dátumok kiválasztva.")
  }
    /**
   * Takes a 
   * @param {date} date The date to check for disabling
   * @return {boolean} true for disabling
   */
  tileDisabled = ({date}) => {
    date = moment(date)
    const overlap = this.state.overlaps[date.clone().format("YYYY-MM-DD")]
    return date.isBefore(moment().startOf("day")) || (overlap && overlap.afterNoon)
  }
  

  updateRoute = (name, value) => {

    const {history, match} = this.props
    let {search: values} = history.location
    values = queryString.parse(values)
    
    if (queryKeysTranslation[name]) {
      values[queryKeysTranslation[name]] = value
      const newQuery = queryString.stringify(values)
      history.push(match.path+"?"+newQuery)
    }
  }

  handleChange = (name, value) => {
    this.setState({
      reservation: {
        ...this.state.reservation,
        [name]: value
      }
    })
    this.updateRoute(name, value)
  }

  handleChildrenChange = (name, value) => {
    
    this.setState({
      reservation: {
        ...this.state.reservation,
        children: this.state.children.push(null)
      }
    })
    this.handleChange(name, value)
  }

  handleButtonChange = e => {
    e.preventDefault()
    const {name, value} = e.target
    
    this.handleChange(name, value)
  }



  /**
   * Validates the reservation before sending it to the server
   * @param {object} reservation The reservation to be verified
   * @return {boolean}
   */
  validateReservation = ({
    roomId,
    from, to,
    name, email, tel, message,
    adults, children
  }) => {
    let errorMessage = false
    if (typeof roomId !== "number" || roomId > 6) {
      errorMessage = "szoba"
    } else if (typeof from !== "number") {
      errorMessage = "érkezési dátum"
    } else if (typeof to !== "number") {
      errorMessage = "távozási dátum"
    } else if (!nameRe.test(name)) {
      errorMessage = "név"
    } else if (!emailRe.test(email)) {
      errorMessage = "e-mail cím"
    } else if (!telRe.test(tel)) {
      errorMessage = "telefonszám"
    } else if (typeof message !== "string") {
      errorMessage = "üzenet"
    } else if (typeof adults !== "number" || adults < 1) {
      errorMessage = "felnőtt"
    } else if (typeof children !== "number" || children < 0) {
      errorMessage = "gyerek"
    }
    
    if (errorMessage) {
      this.showNotification("error",
          <p>
            Érvénytelen {errorMessage}! Kérjük próbálja újra.
            Ha úgy gondolja hiba történt, kérjük írjon a
            <a href="mailto:hiba@bibicvedeghazak.hu">hiba@bibicvedeghazak.hu</a> címre.
          </p>, 5000)
      return false
    } else {
      return true
    }

  }       


  submitReservation = e => {
    e.preventDefault()
    let {
      name, email, tel, message, address,
      roomId, adults, children,
      from, to
    } = this.state.reservation

    const newReservation = {
      timestamp: database.ServerValue.TIMESTAMP,
      lastHandledBy: "",
      roomId: parseInt(roomId, 10),
      from: moment(from).set("hour", 14).unix()*1000,
      to: moment(to).set("hour", 10).unix()*1000,
      handled: false,
      name, email, tel, address, message,
      adults, children
    }

    if (this.validateReservation(newReservation)) {
      RESERVATIONS_REF.push().then(snap => {
        const {key} = snap
        RESERVATIONS_REF.child(key)
          .set(newReservation)
          .then(() => {
            this.showNotification("success",
              <p>
                Foglalását rögzítettük. néhány másodperc múlva visszakerül a főoldalra. További kérdésével fordulhat:
                <a href="mailto:info@bibicvendeghazak.hu">info@bibicvendeghazak.hu</a>
                <a href="tel:+36305785730">+36 30 578 5730</a>
              </p>
            , 7500)
            setTimeout(() => this.props.history.push(""), 7500)
          })
          .catch(error => this.showNotification("error", error.message))
      })
    } 
    
  }


  render() {
    const {
            reservation: {
              roomId, 
              name, email, tel, address,
              from, to,
              activeService, message,
              adults, children,
            },
            rooms, 
            services,
            today,  month,
            showRange,
            notification
          } = this.state
          

    return (
      <Fragment>
        <div className="reservation">
          {!('ontouchstart' in document.documentElement) && <ScrollLock/>}
          <span className="close-reservation">
            <Link to="/">✕</Link>
          </span>

          <h2>Foglalás</h2>
          <form className="reservation-form" action="">
            <h4>Válasszon szobát {roomId && `(${roomId}. Szoba kiválasztva)`}</h4>
              {rooms ? 
                <div className="room-picker">
                  {Object.keys(rooms).map(room => {
                    const {id} = rooms[room]
                    return (
                      <div 
                        key={room}
                        id={`szoba-${id}`}
                        className={`room-picker-room ${parseInt(roomId, 10) === id ? "room-active": ""}`}
                      >
                        <button
                          name="roomId"
                          value={id}
                          onClick={this.handleButtonChange}
                        >
                          {id}
                        </button>
                      </div>
                    )
                  })}
                </div>:
                <Loading/>
              }
            
            <h5>a szoba tulajdonságai</h5>
            {services ?
              <div className="room-services">
                {Object.keys(services).map(serviceId => {
                  const {inRoom, name, icon} = services[serviceId]
                  const isInRoom = Object.values(inRoom).includes(parseInt(roomId, 10))
                  return (
                    <div
                      key={serviceId}
                      className={`room-service ${isInRoom ? "service-in-room" : ""}`}
                    >
                      <img src={icon} alt={name}/>
                      <span>{name}</span>
                    </div>
                  )
                })} 
              </div> :
              <Loading/>
            }

            <FormSection title="Személyi adatok">
              <FormGroup footnote="kötelező">
                <PersonalDetail required
                  onChange={this.handleChange}
                  label="teljes név"
                  name="name"
                  value={name}
                  placeholder="Kovács József"
                  errorMessage="Érvénytelen név!"
                  notification={toast.error}
                />
                <PersonalDetail required
                  onChange={this.handleChange}
                  label="e-mail cím"
                  name="email"
                  value={email}
                  placeholder="kovacs.jozsef@email.hu"
                  errorMessage="Érvénytelen e-mail cím!"
                  notification={toast.error}
                />
                <PersonalDetail required
                  onChange={this.handleChange}
                  label="telefonszám"
                  name="tel"
                  value={tel}
                  placeholder="+36-30-123-4567"
                  errorMessage="Érvénytelen telefonszám!"
                  notification={toast.error}
                />
                <PersonalDetail required
                  onChange={this.handleChange}
                  label="lakcím"
                  name="address"
                  value={address}
                  placeholder="1234 Budapest, Fő utca 1."
                  errorMessage="Érvénytelen lakcím!"
                  notification={toast.error}
                />
              </FormGroup>
            </FormSection>

            <FormSection title="Foglalás adatai">
              <FormGroup
                className="dates"
                footnote="érkezés: 14:00-tól, távozás: 10:00-ig"
              >
                <Date 
                  required
                  onClick={toast.warning}
                  label="érkezés" name="from"
                  value={from}
                />
                <Date 
                  required
                  onClick={toast.warning}
                  label="távozás" name="to"
                  value={to}
                />
                <Calendar
                  activeStartDate={moment(month).toDate()}
                  showWeekNumbers
                  showNeighboringMonth={false}
                  className="date-picker"
                  minDate={today}
                  locale="hu-HU"
                  tileDisabled={this.tileDisabled}
                  selectRange
                  returnValue="range"
                  minDetail="month"
                  value={showRange ? [from, to] : null}
                  onActiveDateChange={this.handleActiveDateChange}
                  onChange={this.handleDatesChange}
                />
              </FormGroup>
              <FormGroup
                title="személyek"
                footnote="minimum 1fő"
              >
                <PeopleCount required
                  min={1} placeholder={1}
                  onChange={this.handleChange}
                  label="felnőtt" name="adults"
                  value={adults}
                />
                <Children required
                  onChange={this.handleChange}
                  label="gyerek" name="children"
                  values={children}
                />
              </FormGroup>
              <FormGroup
                title="ellátás"
                className="services"
                footnote="Az ételeket előre kell kiválasztani, mivel nem üzemeltetünk éttermet."
              >
                <Service 
                  label="reggeli" name="activeService"
                  checked={activeService==="reggeli"}
                  value="reggeli"
                  onChange={this.handleChange}
                />
                <Service 
                  label="félpanzió" name="activeService"
                  checked={activeService==="felpanzio"}
                  value="felpanzio"
                  onChange={this.handleChange}
                />
                <Service 
                  label="teljes ellátás" name="activeService"
                  checked={activeService==="teljes-ellatas"}
                  value="teljes-ellatas"
                  onChange={this.handleChange}
                />
                <Service 
                  label="all inclusive" name="activeService"
                  checked={activeService==="all-inclusive"}
                  value="all-inclusive"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </FormSection>

            <FormSection title="Egyéb">
              <FormGroup
                title="üzenet"
                className="message"
              >
                <textarea 
                  name="message"
                  rows="4"
                  onChange={({target: {name, value}}) => this.handleChange(name, value)}
                  value={message}
                  placeholder="Megjegyzés..."
                  type="text"
                />
              </FormGroup>
            </FormSection>


            <button
              onClick={this.submitReservation} 
              type="submit"
              className="submit-reservation"
            >Küldés
              <span>
                {(99999).toLocaleString('hu-HU', {
                  style: 'currency',
                  currency: 'HUF',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                })}
              </span>
            </button>

          </form>
        </div>
      </Fragment>
    )
  }
}