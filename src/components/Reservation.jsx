import Moment from 'moment'
import {extendMoment} from 'moment-range'
import 'moment/locale/hu'
import React, {Fragment} from 'react'
import Calendar from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'
import {Link} from 'react-router-dom'
import ScrollLock from 'react-scrolllock'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BANK from '../assets/icons/bank.png'
import CASH from '../assets/icons/cash.png'
import MASTERCARD from '../assets/icons/mastercard.png'
import SZEP from '../assets/icons/szep.png'
import VISA from '../assets/icons/visa.png'


import {Data} from './db'
import {FormSection, FormGroup} from './Form'
import {PersonalDetail, PeopleCount, Children,Send, Service, Date as DateLabel} from './Form/inputs'
import {Loading} from './shared/Elements'
import {toPrice} from '../utils/language'

const moment = extendMoment(Moment)


const Reservation = () =>
  <Data.Consumer>
    {({
      state: {
        reservation: {
          name, address, tel, email, roomId, from, to,
          activeService, message, adults, children, price
        },
        rooms, roomServices, isReserving,
        overlaps, tomorrow, month
      },
      actions: {
        handleRoomChange, updateReservation, submitReservation,
        handleDateSelect, handleMonthChange
      }
    }) => {
      const maxPeople = (rooms && roomId && rooms[roomId-1] && rooms[roomId-1].prices.metadata.maxPeople) || 1
      return (
        <div className={`reservation ${isReserving ? "is-reserving" : ""}`}>
          {!('ontouchstart' in document.documentElement) && <ScrollLock/>}
          <span className="close-reservation">
            <Link to="/">✕</Link>
          </span>

          <h2>Foglalás</h2>

          <form
            action=""
            className="reservation-form"
          >
            <h4>Válasszon szobát {roomId && `(${roomId}. Szoba kiválasztva)`}</h4>
            {rooms ?
              <div className="room-picker">
                {Object.keys(rooms).map(room => {
                  const {id} = rooms[room]
                  return (
                    <div
                      className={`room-picker-room ${parseInt(roomId, 10) === id ? "room-active": ""}`}
                      id={`szoba-${id}`}
                      key={room}
                    >
                      <button
                        onClick={handleRoomChange}
                        value={id}
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
            {roomServices ?
              <div className="room-services">
                {Object.values(roomServices).map(({
                  inRoom, name, icon
                }, serviceId) => {
                  const isInRoom = Object.values(inRoom).includes(parseInt(roomId, 10))
                  return (
                    <div
                      className={`room-service ${isInRoom ? "service-in-room" : ""}`}
                      key={serviceId}
                    >
                      <img
                        alt={name}
                        src={icon}
                      />
                      <span style={{fontSize: "1rem"}}>{name}</span>
                    </div>
                  )
                })}
              </div> :
              <Loading/>
            }

            <FormSection title="Személyi adatok">
              <FormGroup footnote="kötelező">
                <PersonalDetail
                  errorMessage="Érvénytelen név!"
                  hasFootnote
                  label="teljes név"
                  name="name"
                  notification={toast.error}
                  onChange={updateReservation}
                  value={name}
                />
                <PersonalDetail
                  errorMessage="Érvénytelen e-mail cím!"
                  hasFootnote
                  label="e-mail cím"
                  name="email"
                  notification={toast.error}
                  onChange={updateReservation}
                  value={email}
                />
                <PersonalDetail
                  errorMessage="Érvénytelen telefonszám!"
                  hasFootnote
                  label="telefonszám"
                  name="tel"
                  notification={toast.error}
                  onChange={updateReservation}
                  value={tel}
                />
                <PersonalDetail
                  errorMessage="Érvénytelen lakcím!"
                  hasFootnote
                  label="lakcím"
                  name="address"
                  notification={toast.error}
                  onChange={updateReservation}
                  value={address}
                />
              </FormGroup>
            </FormSection>

            <FormSection title="Foglalás adatai">

              <FormGroup
                className="dates"
                footnote="érkezés: 14:00-tól, távozás: 10:00-ig"
              >
                <DateLabel
                  hasFootnote
                  label="érkezés"
                  name="from"
                  notification={toast.warning}
                  value={from}
                />
                <DateLabel
                  hasFootnote
                  label="távozás"
                  name="to"
                  notification={toast.warning}
                  value={to}
                />
                <Calendar
                  dateStates={Array.isArray(overlaps) ?
                    overlaps
                      .map(day => ({
                        state: "unavailable",
                        range: moment.range(moment(day), moment(day))
                      })): []}
                  firstOfWeek={1}
                  min={moment(month).month() === moment().month() ? tomorrow : null}
                  numberOfMonths={window.innerWidth < 640 ? 1 : 2}
                  onSelect={handleDateSelect}
                  paginationArrowComponent={props =>
                    <PaginationArrow
                      onMonthChange={handleMonthChange}
                      {...props}
                    />
                  }
                  selectedLabel="Kiválasztva"
                  value={moment.range(from, to)}
                />
                <span className="calendar-legend">
                  <ul>
                    <li>Kiválasztva</li>
                    <li>Nem elérhető</li>
                  </ul>
                </span>

              </FormGroup>
              <FormGroup
                footnote="6 év alatt ingyenes"
                title={`személyek (maximum ${maxPeople} fő)`}
              >
                <PeopleCount
                  label="felnőtt"
                  max={maxPeople - children.length}
                  min={1}
                  name="adults"
                  onChange={updateReservation}
                  placeholder={1}
                  value={adults}
                />
                <Children
                  hasFootnote
                  label="gyerek"
                  max={maxPeople - adults}
                  name="children"
                  onChange={updateReservation}
                  values={children}
                />
              </FormGroup>
              <FormGroup
                className="services"
                footnote={
                  <Fragment>
                      az ételeket előre kell kiválasztani, mivel nem üzemeltetünk éttermet <Link to="etelek">főbb ételeinket ide kattintva találja →</Link>
                  </Fragment>
                }
                title="ellátás"
              >
                <Service
                  checked={activeService==="breakfast"}
                  label="reggeli"
                  name="activeService"
                  onChange={updateReservation}
                  value="breakfast"
                />
                <Service
                  checked={activeService==="halfBoard"}
                  label="félpanzió"
                  name="activeService"
                  onChange={updateReservation}
                  value="halfBoard"
                />
              </FormGroup>
            </FormSection>

            <FormSection title="Megjegyzés">
              <FormGroup
                className="message"
              >
                <textarea
                  name="message"
                  onChange={({target: {
                    name, value
                  }}) => updateReservation(name, value)}
                  placeholder="(pl.: étel egyeztetés, speciális kívánság, egyéb kérdés)"
                  rows="8"
                  type="text"
                  value={message}
                />
              </FormGroup>
            </FormSection>
            <Send
              disabled={isReserving}
              onClick={submitReservation}
            >
                Küldés
              <span className="footnote-asterix">
                {toPrice(price)}
              </span>
            </Send>
            <span className="footnote">Felhívjuk figyelmét, hogy a foglalás elküldése fizetési kötelezettséget nem von maga után. Foglalását először jóvá kell hagyjuk. A fizetés helyben, vagy átutalással történik. További részletekért kérdezhet a megjegyzésben, vagy írhat az alábbi címre:
              <div className="payment-methods">
                <h5>Elfogadott fizetési módok</h5>
                <ul>
                  <li>
                    <h6>Készpénz</h6>
                    <img
                      alt="Készpénzes fizetés"
                      src={CASH}
                    />
                  </li>
                  <li>
                    <h6>Előreutalás</h6>
                    <img
                      alt="Előreutalás"
                      src={BANK}
                    />
                  </li>
                  <li>
                    <h6>Visa</h6>
                    <img
                      alt="Visa elfogadóhely"
                      src={VISA}
                    />
                  </li>
                  <li>
                    <h6>Mastercard</h6>
                    <img
                      alt="Mastercard elfogadóhely"
                      src={MASTERCARD}
                    />
                  </li>
                  <li>
                    <h6>OTP SZÉP</h6>
                    <img
                      alt="OTP SZÉP Kártya elfogadóhely"
                      src={SZEP}
                    />
                  </li>
                </ul>
              </div>
              <a href="mailto:szallasfoglalas@bibicvendeghazak.hu">szallasfoglalas@bibicvendeghazak.hu</a>
            </span>
          </form>
        </div>
      )
    }
    }
  </Data.Consumer>

export default Reservation


const PaginationArrow = ({
  disabled, direction, onTrigger, onMonthChange
}) =>

  <span
    className={`DateRangePicker__PaginationArrow DateRangePicker__PaginationArrow--${direction}`}
    onClick={() => {
      direction === "next" ?
        onMonthChange(1) :
        onMonthChange(-1, disabled)
      onTrigger()
    }}
  >
    {direction === "next" ? "►" : "◄"}
  </span>