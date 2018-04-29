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
import {Loading} from './shared/Elements'
import {valid, valueToState} from '../utils/validate'
import {translate, isQueryString, toPrice} from '../utils/language'
import {RESERVATIONS_FS_REF, TIMESTAMP} from '../lib/firebase'

const tomorrow = moment().add(1, "day").startOf("day").toDate()

const initialState = {
  month: moment().toDate(),
  overlaps: {},
  reservation: {
    roomId: null,
    from: tomorrow, to: tomorrow,
    name: "", email: "", address: "", tel: "", message: "",
    adults: 1, children: [],
    activeService: "breakfast",
    price: 0
  },
  rooms: null,
  services: null,
  tomorrow,
  tempDate: null,
  isReserving: false
}

export default class Reservation extends Component {

  state = initialState
  


  // ----------------------------------------------------------------------------
  // Lifecycle methods
  
  componentDidMount() {
    ROOM_SERVICES_REF.on("value", snap => {
      this.setState({services: snap.val()})
    })
    ROOMS_REF.once("value", snap => {
      this.setState({rooms: snap.val()})
    })
    .then(() => this.updateByURL(this.props.location.search, true))
  }
        
  componentWillReceiveProps({location: {search}}) {this.updateByURL(search)}

  componentWillUnmount() {this.setState({initialState})}




  // ----------------------------------------------------------------------------  
  // Reservation

  updatePrice = () => {
    const {reservation, rooms} = this.state
    let {roomId, activeService, adults, children, from, to} = reservation
    roomId = roomId - 1
    if (rooms[roomId]) {
      const childrenCount = children.filter(i => i === "6-12").length
      const prices = rooms[roomId].prices.table[activeService]
      let price = 0
      // NOTE: Add discount to database
      const {discount=0} = prices
      const adultPrices = prices[adults]
      if (adultPrices) {
        const childrenPrices = adultPrices[childrenCount]
        if (childrenPrices) {
          price = childrenPrices.price
        }
      }
      const reservationLength = moment(to).diff(moment(from), "days")
      price = price * reservationLength * (1-(discount/100))
      this.setState(({reservation}) => ({reservation: {...reservation, price}}))
    }
  }

  /**
   * Validates the reservation before sending it to the server
   * @param {object} reservation The reservation to be verified
   * @return {boolean}
   */
  isValidReservation = ({roomId, from, to, address, name, email, tel, message, adults, children}) => {

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
        <p style={{padding: ".5rem", fontSize: "1.2rem"}}>{error}<br/>
          <span style={{fontSize: "1rem"}}>
            Úgy gondolja más a hiba oka? <br/> Kérjük jelezze itt: <br/>
            <a style={{color: "white"}} href="mailto:hiba@bibicvedeghazak.hu">hiba@bibicvedeghazak.hu</a>
          </span>
        </p>, {
          autoClose: 5000
        })
      return false
    } else {
      return true
    }
  }     

  submitReservation = e => {
    e.preventDefault()
    this.setState({isReserving: true})
    const reservation = Object.assign({}, this.state.reservation)
    const {from, to, message, roomId} = reservation
    reservation.from = moment(from).startOf("day").hours(14).valueOf()
    reservation.to = moment(to).startOf("day").hours(10).valueOf()
    reservation.message = message !== "" ? message : "Nincs üzenet"
    this.isAvailable(roomId, from, to).then(available => {
      
      if (available) {
        if (this.isValidReservation(reservation)) {
          RESERVATIONS_FS_REF
            .add({
              ...reservation,
              lastHandledBy: "",
              timestamp: TIMESTAMP,
              handled: false,
            })
            .then(() => {
              this.setState({isReserving: false})
              toast.success(
                <p style={{padding: ".5rem", fontSize: "1.2rem"}}>Foglalását rögzítettük. <br/>
                <span style={{fontSize: "1rem"}}>
                  Néhány másodperc múlva visszakerül a főoldalra. További kérdésével fordulhat:<br/>
                  <a style={{color: "white"}} href="mailto:info@bibicvendeghazak.hu">info@bibicvendeghazak.hu</a><br/>
                  <a style={{color: "white"}} href="tel:+36305785730">+36 30 578 5730</a>
                </span>
              </p>, {autoClose: 7500})
              
              setTimeout(() => this.props.history.push(""), 7500)
            })
            .catch(({code, message}) => {
              this.setState({isReserving: false})
              toast.error(
                <p style={{padding: ".5rem", fontSize: "1.2rem"}}>Hiba: {code} - {message}<br/>
                  <span style={{fontSize: "1rem"}}>
                    Ha a probléma tartósan fennáll, <a href={`mailto:info@balazsorban.com?subject=Hibajelentés (${code})&body=${message}`}>ide kattintva</a> jelezheti.
                  </span>
                </p>, {autoClose: 10000})
            })
        } else {
          this.setState({isReserving: false})
        }
      } else {
        this.setState({isReserving: false})
        toast.error( <p style={{padding: ".5rem", fontSize: "1.2rem"}}>
          Sajnáljuk<br/>
          <span style={{fontSize: "1rem"}}>
            Adott intervallumban már van foglalásunk. Kérjük próbálkozzon másik dátumokkal, vagy másik szobával.
          </span>
           </p>, {autoClose: 10000})
      }
    })
    
  }



  // ----------------------------------------------------------------------------  
  // Routing

  /**
   * @param {Event} e
   */
  handleRoomChange = e => {
    e.preventDefault()
    const {value: roomId} = e.target
    
    this.setState({overlaps: {}},() =>
    this.isOverlapping(roomId, this.state.month))
    this.updateReservation("roomId", roomId)

    /**
     * Resetting the the dates
     * also @see updateByURL
     */
    this.updateReservation("from", undefined)
    this.updateReservation("to", undefined)
  }


  /**
   * Updates the reservation either in the state or in the URL
   * If the key is not private, it adds the key=value pair to the URL
   * @param {string} key - reservation key
   * @param value - reservation value
   */
  updateReservation = (key, value) => {
    if (isQueryString(key)) {
      const {history, match: {url}} = this.props
      const search = QueryString.parse(history.location.search)
      search[translate(key)] = key === "activeService" ? translate(value) : value
      history.push(url + "?" + QueryString.stringify(search))
    } else this.setState(({reservation}) => ({reservation: {...reservation, [key]: value}}))
  }

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

      /**
       * The following resets the dates when room change occurs.
       * @see handleRoomChange
       */
      if (!Object.keys(queryString).includes(translate("from"))) reservation.from = undefined
      if (!Object.keys(queryString).includes(translate("to"))) reservation.to = undefined
      
      this.setState({reservation}, () => {
        let {month, reservation: {roomId, from}} = this.state
        if (isInitial) {
          from = moment(from)
          this.setState({month: from.clone().toDate()})
          this.isOverlapping(roomId, from)
        } else {
          this.isOverlapping(roomId, month)
        }
        this.updatePrice()
      })
    }
  }



  // ----------------------------------------------------------------------------  
  // Calendar events

  /**
   * Fetches the corresponding overlap data.
   * The fetching returns a JSON Object with each day containing a boolean if the
   * room is already taken. 
   * @param {number} roomId The id of the room of interest
   * @param {Moment} month The month of interest
   */

  isOverlapping = (roomId, month) => {
    
    const {reservation: {from}, overlaps} = this.state
    const date = moment(month || from || undefined).format("YYYY-MM")
    const isNewOverlaps = !Object.keys(overlaps).filter(overlap => overlap.includes(date)).length
    
    if (isNewOverlaps) {
      const url = "https://us-central1-bibic-vendeghazak-api.cloudfunctions.net/overlaps?"
      fetch(`${url}roomId=r${roomId}&date=${date}`)
      .then(res => res.json())
      .then(overlaps => this.setState(({overlaps: prevOverlaps}) => ({
        overlaps: {
          ...prevOverlaps,
          ...overlaps
        }
      })))
      .catch(e => console.error(e))
    }
  }

  isAvailable = (roomId, from, to) => {
    from = moment(from).format("YYYY-MM-DD")
    to = moment(to).format("YYYY-MM-DD")
    const url = "https://us-central1-bibic-vendeghazak-api.cloudfunctions.net/overlaps?"
    return fetch(`${url}roomId=r${roomId}&date=${from}_${to}`)
            .then(res => res.json())
            .then(data => data)
            .catch(e => console.error(e))
  }
      
      


  handleActiveDateChange = ({activeStartDate: month}) => {
    this.setState({month})
    this.isOverlapping(this.state.reservation.roomId, moment(month))
  }

  handleDayClick = date => {
    const {tempDate} = this.state
    this.setState(({tempDate: !tempDate ? date : null}))
    toast.info(`${!tempDate ? "1." : "2."} dátum kiválasztva.`, {
      autoClose: 1000,
      hideProgressBar: true
    })
  }

  handleDatesChange = dates => {
    const [from, to] = dates
    this.setState(({reservation}) => ({
      reservation: {...reservation, from, to}
    }))
    const [fromFormatted, toFormatted] = dates
      .map(date => moment(date).format("YYYY-MM-DD")) 
    this.updateReservation("from", fromFormatted)
    this.updateReservation("to", toFormatted)
  }
    /**
   * Takes a 
   * @param {date} date The date to check for disabling
   * @return {boolean} true for disabling
   */
  tileDisabled = ({date}) =>  this.state.overlaps[moment(date).format("YYYY-MM-DD")]





  render() {
    const {
      reservation: {roomId, name, email, tel, address, from, to, activeService, message, adults, children, price},
      rooms, 
      services,
      tomorrow,  month,
      tempDate,
      isReserving
    } = this.state

    const maxPeople = (rooms && roomId && rooms[roomId-1] && rooms[roomId-1].prices.metadata.maxPeople) || 1
    
    return (
      <Fragment>
        <ToastContainer 
          closeOnClick
          style={{position: "fixed", zIndex: 10001, bottom: 0}}
          position="bottom-center"
        />
        <div className={`reservation ${isReserving ? "is-reserving" : ""}`}>
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
                          value={id}
                          onClick={this.handleRoomChange}
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
                      <span style={{fontSize: "1rem"}}>{name}</span>
                    </div>
                  )
                })} 
              </div> :
              <Loading/>
            }

            <FormSection title="Személyi adatok">
              <FormGroup footnote="kötelező">
                <PersonalDetail hasFootnote
                  onChange={this.updateReservation}
                  label="teljes név"
                  name="name"
                  value={name}
                  placeholder="Kovács József"
                  errorMessage="Érvénytelen név!"
                  notification={toast.error}
                />
                <PersonalDetail hasFootnote
                  onChange={this.updateReservation}
                  label="e-mail cím"
                  name="email"
                  value={email}
                  placeholder="kovacs.jozsef@email.hu"
                  errorMessage="Érvénytelen e-mail cím!"
                  notification={toast.error}
                />
                <PersonalDetail hasFootnote
                  onChange={this.updateReservation}
                  label="telefonszám"
                  name="tel"
                  value={tel}
                  placeholder="+36-30-123-4567"
                  errorMessage="Érvénytelen telefonszám!"
                  notification={toast.error}
                />
                <PersonalDetail hasFootnote
                  onChange={this.updateReservation}
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
                  hasFootnote
                  onClick={toast.warning}
                  label="érkezés" name="from"
                  value={from}
                />
                <Date 
                  hasFootnote
                  onClick={toast.warning}
                  label="távozás" name="to"
                  value={to}
                />
                <Calendar
                  activeStartDate={month}
                  showWeekNumbers
                  showNeighboringMonth={false}
                  className="date-picker"
                  minDate={tomorrow}
                  locale="hu-HU"
                  tileDisabled={this.tileDisabled}
                  selectRange
                  returnValue={tempDate ? "start" : "range"}
                  minDetail="month"
                  value={tempDate || [from, to]}
                  onClickDay={this.handleDayClick}
                  onActiveDateChange={this.handleActiveDateChange}
                  onChange={this.handleDatesChange}
                />
              </FormGroup>
              <FormGroup
                title={`személyek (maximum ${maxPeople} fő)`}
                footnote="6 év alatt ingyenes"
              >
                <PeopleCount
                  min={1}
                  placeholder={1}
                  max={maxPeople - children.length}
                  onChange={this.updateReservation}
                  label="felnőtt" name="adults"
                  value={adults}
                />
                <Children hasFootnote
                  max={maxPeople - adults}
                  onChange={this.updateReservation}
                  label="gyerek" name="children"
                  values={children}
                />
              </FormGroup>
              <FormGroup
                title="ellátás"
                className="services"
                footnote="az ételeket előre kell kiválasztani, mivel nem üzemeltetünk éttermet"
              >
                <Service 
                  label="reggeli" name="activeService"
                  checked={activeService==="breakfast"}
                  value="breakfast"
                  onChange={this.updateReservation}
                />
                <Service 
                  label="félpanzió" name="activeService"
                  checked={activeService==="halfBoard"}
                  value="halfBoard"
                  onChange={this.updateReservation}
                />
              </FormGroup>
            </FormSection>

            <FormSection title="Megjegyzés">
              <FormGroup
                className="message"
              >
                <textarea 
                  name="message"
                  rows="8"
                  onChange={({target: {name, value}}) => this.updateReservation(name, value)}
                  value={message}
                  placeholder="(pl.: étel egyeztetés, speciális kívánság, egyéb kérdés)"
                  type="text"
                />
              </FormGroup>
            </FormSection>

              {isReserving ?
                <div style={{padding: "24px 0 48px"}} >
                  <Loading/>
                </div> :
                <button
                  onClick={this.submitReservation} 
                  type="submit"
                  className={`submit-reservation ${isReserving ? "active-reserving": ""}`}
                >Küldés
                  <span className="footnote-asterix">
                    {toPrice(price)}
                  </span>
                </button>
              }
          <span className="footnote">Felhívjuk figyelmét, hogy a foglalás elküldése fizetési kötelezettséget nem von maga után. Foglalását először jóvá kell hagyjuk. A fizetés helyben, vagy átutalással történik. További részletekért kérdezhet a megjegyzésben, vagy írhat az alábbi címre:
          <a href="mailto:szallasfoglalas@bibicvendeghazak.hu">szallasfoglalas@bibicvendeghazak.hu</a>
          </span>
          </form>

        </div>
      </Fragment>
    )
  }
}