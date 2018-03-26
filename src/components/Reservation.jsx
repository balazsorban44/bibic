import React, { Component } from 'react'
import queryString from 'query-string'
import {Link} from 'react-router-dom'
import Calendar from 'react-calendar'
import ScrollLock from 'react-scrolllock'
import moment from 'moment'
import 'moment/locale/hu'
import {database} from 'firebase'
import {ROOM_SERVICES_REF, ROOMS_REF, RESERVATIONS_REF} from '../lib/firebase'

import errorIcon from '../media/icons/error.svg'
import warningIcon from '../media/icons/warning.svg'
import successIcon from '../media/icons/success.svg'
import infoIcon from '../media/icons/info.svg'

// NOTE: Extra service icons, may be implemented later on
// "icon" : "https://storage.googleapis.com/bibic-vendeghazak-api.appspot.com/services%2Fservices.svg?GoogleAccessId=bibic-vendeghazak-api@appspot.gserviceaccount.com&Expires=16730323200&Signature=ERQrDXbQWD1rCHqFFHknQhlNXomBjkbmpZDslNWfUPe2nCE4O4ae2FA0%2F4yeBJAlfJNDQbSj%2FeBc8l5uEDnBgoSLSglstpNm5rRT5x3hzoB5%2BpmlRCWYmX7MQ%2BYrPP4Pcfx3MgBQ8g731bnbD52U3u88t4c69WFxKa3TXrVTQ4fT0UENd6dIKT3Z5fdt5ehykeWM4bbUbY7CVL47uwu6PI7PvahBK4emSm72awt5Om28pa3%2F2lD5oq5kgci1BsIdPCZ%2FkkPpgCMTGfZz5pbxmVNIAAcoOAWfRaMQh%2B4NGTMdBJMkqIhjJulEfazBeRC1G6Uq%2BI6ngng8s7uUToqs9w%3D%3D"
// "icon" : "https://storage.googleapis.com/bibic-vendeghazak-api.appspot.com/services%2Fprojector.svg?GoogleAccessId=bibic-vendeghazak-api@appspot.gserviceaccount.com&Expires=16730323200&Signature=nvDgTuGEpS3bDxL1SwgKcSFgmwARfdtkCFjoTmqLlmhEC6vicO%2FkCH47hWcS%2BkbEjKnC0ALBkzxty59QT1pUlSZXlmljXUjjIsoWRIKjvOAwPFDoAfrqf2kr0svuOojhOnUS6616jHkJZMu9RuYldPgUxUl3meWJMMQ36xddbvHDQEY1jxBfN%2FlOy7ze9hbQJl5u8J%2Fo0RLu7q57IWh8Qf3ujB%2FUmu2jMwZ4%2FoSA7OlxddVfcgG9f1pIK9FuvAUudO7a4T34KlnwqDErn2NwJSpFcthnUKKG2TkXrHrm1NU5%2FlDdv5dT8Nw7tPGaQs1UsGlpiZpJgvB56LqP%2BfR5pw%3D%3D"
// "icon" : "https://storage.googleapis.com/bibic-vendeghazak-api.appspot.com/services%2Fwinery.svg?GoogleAccessId=bibic-vendeghazak-api@appspot.gserviceaccount.com&Expires=16730323200&Signature=oOgZ3Da%2FAbAVYO88rDXqVhl%2BYVzEBvvTo5KY2wLaXnIfWD5gvUHbkAEkh1buIAa2E0q86BVauMdkb8Bda5vk%2F40jt0vRvXtKNKaKsfAnKuMLOKvc6nOEE2jQSQKNzjqmI%2F9ciwUVLPEmsAhVgxnF35Fa8VIJL7mcpE8kdpqtwgLvuu4XAeoRskZ%2B4ife9E6YLNRee5FFGlbmnxujWKyNcEhtTJhzPzpPYdGWKCZoCiIYEtXKX0TaSifhZBh9NGjf7U5VIBAMSwVlC4yuGp%2FTsd9xpyJqRUBr%2Ffm14%2FDX5J7g3ZaRfPLQz%2FXsGXIk2TMZ2jNhvQcjlaA4YoTFwtXuiA%3D%3D"
// "icon" : "https://storage.googleapis.com/bibic-vendeghazak-api.appspot.com/services%2Fcalendar.svg?GoogleAccessId=bibic-vendeghazak-api@appspot.gserviceaccount.com&Expires=16730323200&Signature=OzAajf7poIxVf1i83PFH0YvIz218jDKkIbDIP0JLf4%2FZyZuffbEnavdGFgqfpF1KC08wG4HwYSp7xk5PwkUxDZpEM%2FHCYl71OPrz2NmNNLkspvk3xD3MkX9SLr4D0J%2FPnIWWkyq0791MB0ZyEeKGW5Pge%2Fdg730Z%2F8NtbWbC51M25bc8NR0WDxUh%2BULpXrgXxzYaoyJxYxCddwkCeQHN3FuqGDNoP9keQ3kIzEG4rPDG7F5IwcvVmCgkh2SKqg%2FawsqYyPKfmfB7MkiceDVqIQhHzoH0RqtOgpAHQiZ0qilnz0MQXOyMeVjM%2Bh5DTMaRHlm%2B8gegmJGR18d8TtenqQ%3D%3D"
// "icon" : "https://storage.googleapis.com/bibic-vendeghazak-api.appspot.com/services%2F65m2.svg?GoogleAccessId=bibic-vendeghazak-api@appspot.gserviceaccount.com&Expires=16730323200&Signature=DkBbmNkolVFcw0L91mWFwGOEZFYMQ0zvbpBEzHojeBEeT6tNOX0hQvGRvTun25TdcfGkkGX3XFE4hL95uvQaCUXVccnAmTMR8nn%2FTrt1%2Fbvgjmd0oKfH5nNNOa0lsmrcEEDSiXP%2BWaywU0p0KqZ4ZBD5WWxEKsXhJKMUDs6Cm5o3fbSOTmRyBMffl1DH3pcvkjUYHZJfDOAs85SBAmKbc3s8x88GvDxYXeV9v5utS6V0PLclwt6AJEByUu1aQnt4kZ5fCsPRXIZKgC9yGZF%2FhXbZcFD9BaoPDQzKaSVAvD8IHDQh1vnjqyhH0jS4nC9mxVFeaMymJYNB9S3Bav5wkw%3D%3D"
// "icon" : "https://storage.googleapis.com/bibic-vendeghazak-api.appspot.com/services%2Fpooltable.svg?GoogleAccessId=bibic-vendeghazak-api@appspot.gserviceaccount.com&Expires=16730323200&Signature=FOj4qxji7Fs6ObV3npNesECrmdSBVWdZHJ1qHI1uNVnDc4DyAerh3UeuanW%2FGTjsQVmUJnJmAQkkfKb79QpUr5FxeRtKSzDcMABs5GK1GL30UYJB2h71%2Bgq1ZxXxbmr1bNZg49IrzZUsuy5uv5XJBInCkVRAdPFEggxN5yHBOOi%2Fy%2FLArJYTamiMum1KNsKT2wPwPRNWCsfkBVTs6aDfpN1rIeXTUaQPUD21pI6eUgWKj%2B2uCu%2FC%2BLc583XB%2FfSMEm8ypmNTs3M8U4Lt%2Bg%2BIaSYIw8ld2wZtWVFPj5I2dMBpPMM5Vkm0bmJSDTj4aXbgm9M23dGG5tFNwnfL31aTLQ%3D%3D"
// "icon" : "https://storage.googleapis.com/bibic-vendeghazak-api.appspot.com/services%2Fbeertap.svg?GoogleAccessId=bibic-vendeghazak-api@appspot.gserviceaccount.com&Expires=16730323200&Signature=Bg5TC4yy%2FN8JSSCobbCivQ71%2BZ6S8xtalmSVq4LRxp5tIfefeN%2F56bsomNldcjNDCMhPb29RBiObQPpjdi6%2BRigvtF2PjB75WVdTC3S9BgrhbZrSssIaEo2HPGykmovqCeV3h6j3oDYMyYdmPi7Y%2FQABe85UPT%2Bhhhf22DkRcDq4irUJbPhrwIsaRktaUJlLtgoA%2By3aaI0spVcOD7XTf34660Rh%2BU%2FmOazLAbUEMAavhvlQj4ZZbcMkMfUF7mbsv0cy1gnmIi8EaganimlCYFLbl1IDbh0A0MqWYwVicJdH2F10O1WUeatrpvSDPvi09AuqbFSd3ehJGxKOSa3WFw%3D%3D"
// "icon" : "https://storage.googleapis.com/bibic-vendeghazak-api.appspot.com/services%2Fstaff.svg?GoogleAccessId=bibic-vendeghazak-api@appspot.gserviceaccount.com&Expires=16730323200&Signature=KWEY8tY95%2FuKn7IKPN%2BfPNgdRbIGxpT49sq9hz1DmwH5%2BalHpOJi7W0U8XTDpHw6F03ocH1gAX8cCsuaa6QIw0LJzJ0eZ9PM2j3wHEMTmuWMEbkGTyJebdB6Oqsi8P7Jcix7uWAgGNGWswKSZV%2FeHdUv96mePqCinfr93wKZpBNS%2BiV4Z4MSMmctpg%2FmQDbE76qFyXzxuHbRkSyRsKxLWpkFCQZVTmPtTWkY2uV4Lsfn2OpJ6YxDhTmJRjypBCtrw1uSWi0wpUi5AQFnY9uF%2BhJfH70uuPvtHe%2BP218yCjx91%2BsgudfpoZv8w8PPsJPO%2BYjA1tOFBpac%2FKJkvPQw%2BQ%3D%3D"


const nameRe = new RegExp(/[\s.áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z-]/)
const emailRe = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
const telRe = new RegExp(/[0-9-+\s]/)


export default class Reservation extends Component {

  state = {
    roomId: "",
    today: null,
    from: null,
    to: null,
    name: "",
    email: "",
    message: "",
    tel: "",
    adults: "",
    children: "",
    activeService: null,
    rooms: null,
    services: null,
    overlaps: {},
    error: {},
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
    const {search} = this.props.location
    this.updateByRoute(search, true)
  }

  componentWillReceiveProps({location: {search}}) {
    this.updateByRoute(search)
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
    if (isInitial || this.state.month !== month || this.state.roomId !== roomId) {
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

  /**
   * Takes a 
   * @param {date} date The date to check for disabling
   * @return {boolean} true for disabling
   */
  tileDisabled = ({date}) => {
    const overlap = this.state.overlaps[moment(date).format("YYYY-MM-DD")]
    return overlap && overlap.afterNoon
  }
  
  updateByRoute = (search, isInitial=false) => {
    const today = moment().toDate()
    if (search) {
      const { 
              szoba: roomId, 
              erkezes, tavozas,
              ellatas: activeService,
              felnott: adults,
              gyerek: children
            } = queryString.parse(search)
      
      const from = moment(erkezes).toDate()
      const to = moment(tavozas).toDate()
      
      this.isOverlapping(roomId, erkezes ? moment(from) : moment(), isInitial)
      
      this.setState({
        // to preserve the controlled input type
        roomId: roomId || "", 
        today, from, to,
        adults: adults || "",
        children: children || "",
        activeService
      })

    } else {
      this.setState({
        today, 
        from: today,
        to: today
      })
    }
  }
  

  /**
   * Shows a notification at the bottom of the page
   * @param @enum {string} type the type of the notifications. Available: warning, error, success, default
   * @param {jsx} message the message to show
   * @param {number} [length] The length of the notification in ms. Default: 3000
   */
  showNotification = (type, message, length=3000) => {
    let color = ""
    switch (type) {
      case "warning":
        color = "#c4960d"
        break
      case "error":
        color = "#7f0606"
        break
      case "success":
        color = "#30893f"
        break
      default:
        color = "#444444"
    }

    this.setState({
      notification: {type, color, message}
    })

    setTimeout(() => {
      this.setState({notification: null})
    }, length)
  }



  handleRoomChange = e => {
    e.preventDefault()
    const newQuery = queryString.stringify({szoba: e.target.value})
    this.props.history.push(this.props.match.path+"?"+newQuery)
  }

  handleDatesChange = dates => {
    const {search} = this.props.location
    const values = queryString.parse(search)
    
    values.erkezes = moment(dates[0]).format("YYYY-MM-DD")
    values.tavozas = moment(dates[1]).format("YYYY-MM-DD")

    const newQuery =  queryString.stringify(values)
    this.setState({showRange: true})
    this.showNotification("info", "Dátumok kiválasztva!")
    this.props.history.push(this.props.match.path+"?"+newQuery)
  }
  
  handleActiveDateChange = ({activeStartDate}) => {
    this.setState({showRange: false})
    this.isOverlapping(this.state.roomId, moment(activeStartDate))
  }

  handlePersonalInfoChange = ({target: {value, name}}) => {
    this.setState({[name]: value})
  }

  validateInput = ({target: {value, name}}) => {
    let isError, message
    // Self comment: the regular expression checks if the value MATCHES the pattern.
    // So it has to be negated
    switch (name) {
      case "name": {
        isError = !nameRe.test(value)
        message = isError ? "Érvénytelen név" : ""
        break
      }
      case "email": {
        isError = !emailRe.test(value)
        message = isError ? "Érvénytelen e-mail cím" : ""
        break
      }
      case "tel": {
        isError = !telRe.test(value)
        message = isError ? "Érvénytelen telefonszám" : ""
        break
      }
      default:
        isError = false
        message = ""
    }

    this.setState({
      error: {
        ...this.state.error,
        [name]: isError
      }
    })

    // do not fire notification, if the user did not fill in any info, or the info was corrected
    isError && value !== "" && this.showNotification("error", message)
  }

  handleChange = ({target: {value, name}}) => {
    const {location, history, match} = this.props
    const values = queryString.parse(location.search)
    values[name] = value
    const newQuery =  queryString.stringify(values)
    history.push(match.path+"?"+newQuery)
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
      name, email, tel, message, 
      roomId, adults, children,
      from, to
    } = this.state

    const newReservation = {
      timestamp: database.ServerValue.TIMESTAMP,
      lastHandledBy: "",
      roomId: parseInt(roomId, 10),
      from: moment(from).set("hour", 14).unix()*1000,
      to: moment(to).set("hour", 10).unix()*1000,
      handled: false,
      name,
      email,
      tel,
      message: message || "Nincs ütenet",
      adults: parseInt(adults, 10) || 1,
      children: parseInt(children, 10) || 0
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
    const { rooms, roomId, services,
            name, email, tel,
            today, from, to, month,
            activeService, message,
            adults, children,
            showRange,
            notification, error
          } = this.state

    return (
      <div className="reservation">
        <span className="close-reservation">
          <Link to="/">✕</Link>
        </span>
        <ScrollLock/>
        <Notification {...{notification}}/>

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
                    <span>{name}</span>
                  </div>
                )
              })} 
            </div> :
            <Loading/>
          }
          <h4>Személyi adatok</h4>
          <div className="form-group">
            <div className={`input-box personal-detail ${error.name ? "input-error" : ""}`}>
              <label className="required-asterix" htmlFor="name">teljes név</label>
              <input onChange={this.handlePersonalInfoChange} onBlur={this.validateInput} value={name} placeholder="Kovács József" type="text" name="name"/>
            </div>
            <div className={`input-box personal-detail ${error.email ? "input-error" : ""}`}>
              <label className="required-asterix" htmlFor="email">e-mail cím</label>
              <input onChange={this.handlePersonalInfoChange} onBlur={this.validateInput} value={email} placeholder="kovacs.jozsef@email.hu" type="email" name="email"/>
            </div>
            <div className={`input-box personal-detail ${error.tel ? "input-error" : ""}`}>
              <label className="required-asterix" htmlFor="tel">telefonszám</label>
              <input onChange={this.handlePersonalInfoChange}  onBlur={this.validateInput} value={tel} placeholder="+36-30-123-4567" type="tel" name="tel"/>
            </div>
            <span className="footnote">kötelező</span>
          </div>

          <h4>Foglalás adatai</h4>
          <div className="form-group dates">
            {from && to &&
              <React.Fragment>
                <div onClick={
                    () => this.showNotification("warning", "Kérjük válasszon érkezési és távozási dátumot a naptáron!")} className="input-box">
                  <label className="required-asterix" htmlFor="erkezes">érkezés</label>
                  <input type="text" name="erkezes" value={moment(from).format("LL")} readOnly/>
                </div>
                <div onClick={
                    () => this.showNotification("warning", "Kérjük válasszon érkezési és távozási dátumot a naptáron!")} className="input-box">
                  <label className="required-asterix" htmlFor="tavozas">távozás</label>
                  <input type="text" name="tavozas" value={moment(to).format("LL")} readOnly/>
                </div>
              </React.Fragment>
            }
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
            <span className="footnote">érkezés: 14:00-tól, távozás: 10:00-ig</span>
          </div>

          <h5>személyek</h5>
          <div className="form-group">
            <div className="input-box people-count">
              <label className="required-asterix" min={1} htmlFor="felnott">felnőtt</label>
              <input min={1} placeholder={1} onChange={this.handleChange} name="felnott" type="number" value={adults}/>
            </div>
            <div className="input-box people-count">
              <label htmlFor="gyerek">gyerek</label>
              <input min={0} placeholder={0} onChange={this.handleChange} name="gyerek" type="number" value={children}/>
            </div>
            <span className="footnote">minimum 1 fő</span>
          </div>
          <h5>ellátás</h5>
          <div className="form-group services">
            <div className="input-box service">
              <label htmlFor="reggeli">reggeli</label>
              <input onChange={this.handleChange} checked={activeService==="reggeli"} type="radio" name="ellatas" value="reggeli" id="reggeli"/>
            </div>
            <div className="input-box service">
              <label htmlFor="felpanzio">félpanzió</label>
              <input onChange={this.handleChange} checked={activeService==="felpanzio"} type="radio" name="ellatas" value="felpanzio" id="felpanzio"/>
            </div>
            <div className="input-box service">
              <label htmlFor="teljes-ellatas">teljes ellátás</label>
              <input onChange={this.handleChange} checked={activeService==="teljes-ellatas"} type="radio" name="ellatas" value="teljes-ellatas" id="teljes-ellatas"/>
            </div>
            <div className="input-box service">
              <label htmlFor="all-inclusive">all inclusive</label>
              <input onChange={this.handleChange} checked={activeService==="all-inclusive"} type="radio" name="ellatas" value="all-inclusive" id="all-inclusive"/>
            </div>
          </div>
          <h5>egyéb üzenet</h5>
          <div className="form-group message">
            <textarea rows="4" onChange={this.handlePersonalInfoChange} value={message} placeholder="Egyéb üzenet..." type="text" name="message"/>
          </div>

          <button type="submit" onClick={this.submitReservation} className="submit-reservation">Küldés
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
    )
  }
}


const Loading = () => <div className="loading"><div className="spinner"/></div>

const Notification = ({notification}) => {
  const icon = type => {
    switch (type) {
      case "error":
        return errorIcon
      case "warning":
        return warningIcon
      case "success":
        return successIcon   
      default:
        return infoIcon
    }
  }

  if (notification) {
    const {color, message, type} = notification
    return (
      <div className="notification"
        style={{background: color}}
      >
        {message}
        <img src={icon(type)} alt="Üzenet ikon"/>
      </div>
    )
  } else {
    return null
  }
}