import React from 'react'
import moment from "moment"
import {toast} from 'react-toastify'
import {validateReservation} from '../../utils/validate'
import {sendNotification} from './notification'


export const getPrice = (room, reservation) => {
  let price = 0
  if (room && reservation) {
    const {
      foodService, from, to
    } = reservation
    let {adults, children} = reservation
    adults = room.prices.table[foodService][adults]
    if (!adults) return price
    children = children.filter(child => child==="6-12").length
    if (children) {
      price = adults[children].price
    } else {
      price = adults[0].price
    }
    // If interval chosen, price times the days
    if (from && to) {
      return price*moment(to).diff(moment(from), "days")
    } else return price
  }
  return price
}

export const isAvailable = (roomId, from, to) =>
  fetch(`https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?roomId=${roomId}`)
    .then(res => res.json())
    .then(overlaps => !overlaps.some(({start, end}) => moment
      .range(start, end)
      .overlaps(moment
        .range(moment(from), moment(to))
      )
    ))


/**
 * Validates the reservation before sending it to the server
 * @param {object} reservation The reservation to be verified
 * @return {boolean}
 */
export const isValidReservation = (reservation, rooms) => {

  if (!reservation || !reservation.roomId || !rooms.length) {
    sendNotification("error", "wrong parameters")
    return false
  }
  const roomLength = rooms.length
  const maxPeople = rooms[reservation.roomId-1].prices.metadata.maxPeople

  const error = validateReservation({
    roomLength, maxPeople, ...reservation
  })
  if (error) {
    sendNotification("error", error)
    return false
  } else {
    return true
  }
}


export const submitReservation = (reservation, setReserving, reset, goToMain, rooms) => {
  setReserving(true)
  const {
    from, to, message, roomId, children
  } = reservation
  reservation.from = moment(from).startOf("day").hours(14).toDate()
  reservation.to = moment(to).startOf("day").hours(10).toDate()
  reservation.message = message !== "" ? message : "Nincs üzenet"

  const newChildren = []
  children.forEach(child => {
    if (newChildren.find(({name}) => name===child)) {
      newChildren[newChildren.findIndex(({name}) => name===child)].count+=1
    } else {
      newChildren.push({name: child,
        count: 1})
    }
  })

  reservation.children = newChildren

  if (isValidReservation(reservation, rooms)) {
    isAvailable(roomId, from, to).then(available => {
      if (available === true) {
        import("../../lib/firebase").then(({RESERVATIONS_FS_REF, TIMESTAMP}) => {

          RESERVATIONS_FS_REF
            .add({
              ...reservation,
              id: `${moment(from).format("YYYYMMDD")}-sz${roomId}`,
              lastHandledBy: "",
              timestamp: TIMESTAMP,
              handled: false
            })
            .then(() => {
              setReserving(false)
              toast.success(
                <p style={{padding: ".5rem",
                  fontSize: "1.2rem"}}
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

              setTimeout(() => {
                goToMain()
                reset()
              }, 7500)
            })
            .catch(({code, message}) => {
              setReserving(false)
              toast.error(
                <p style={{padding: ".5rem",
                  fontSize: "1.2rem"}}
                >Hiba: {code} - {message}<br/>
                  <span style={{fontSize: "1rem"}}>
                Ha a probléma tartósan fennáll, jelezze itt: <a href={`mailto:hiba@bibicvedeghazak.hu?subject=Hibajelentés (${code})&body=${message}`}>hiba@bibicvedeghazak.hu</a>
                  </span>
                </p>, {autoClose: 10000})
            })
        })

      } else {
        setReserving(false)
        toast.error(
          <p
            style={{padding: ".5rem",
              fontSize: "1.2rem"}}
          >
          Sajnáljuk<br/>
            <span style={{fontSize: "1rem"}}>
            Az adott intervallumban már van foglalásunk. Kérjük próbálkozzon másik dátumokkal, vagy másik szobával.
            </span>
          </p>, {autoClose: 10000})
      }
    })} else {
    setReserving(false)
  }
}
