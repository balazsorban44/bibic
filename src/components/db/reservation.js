import {validateReservation} from '../../utils/validate'
import {sendNotification} from './notification'
import {
  areIntervalsOverlapping, differenceInCalendarDays, format, startOfDay, setHours
} from "date-fns"


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
      return price*differenceInCalendarDays(to, from)
    } else return price
  }
  return price
}

export const isAvailable = (roomId, range) =>
  fetch(`https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?roomId=${roomId}`)
    .then(res => res.json())
    .then(overlaps =>
      !overlaps.some(interval => areIntervalsOverlapping(interval, range))
    )


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

/**
 * First validates, then sends the reservation to the server
 * @param {object} reservation the reservation to be submitted
 * @param {function} isReserving to set the state if reserving
 * @param {function} resetReservation reset to default values
 * @param {function} closeReservation close reservation form
 * @param {array} rooms rooms to choose from
 */
export const submitReservation = (reservation, isReserving, resetReservation, closeReservation, rooms) => {
  if (isValidReservation(reservation, rooms)) {
    isReserving(true)
    const {
      roomId, from, to
    } = reservation
    isAvailable(roomId, {start: from, end: to}).then(available => {
      if (available === true) {
        import("../../lib/firebase").then(({RESERVATIONS_FS_REF, TIMESTAMP}) =>
          RESERVATIONS_FS_REF
            .add({
              ...reservation,
              id: `${format(from, "YYYYMMdd", {awareOfUnicodeTokens: true})}-sz${roomId}`,
              lastHandledBy: "",
              timestamp: TIMESTAMP,
              handled: false,
              archived: false
            })
            .then(() => {
              isReserving(false)
              sendNotification("reservationSubmitted")
              setTimeout(() => {
                closeReservation()
                resetReservation()
                return true
              }, 7500)
            })
            .catch(e => {
              isReserving(false)
              sendNotification("error", e.message)
              return false
            })
        )
      } else {
        isReserving(false)
        sendNotification("overlap")
        return false
      }
    }).catch(e => {
      isReserving(false)
      sendNotification("error", e.message)
      return false
    })

  } else {
    isReserving(false)
    return false
  }
}

/**
 * Some properties in the reservation is handled
 * differently on the client then on the server for
 * simplicity. Before submitting though, the client
 * should match the server to pass validation.
 * @param {object} reservation - client side formatting
 * @returns {object} - normalized reservation matching the server
 */
export const normalizeReservation = reservation => {
  // Copy reservation to prevent modifying the original one
  const normalized = {...reservation}
  const {
    from, to, message, children
  } = reservation

  // Normalize dates
  normalized.from = setHours(startOfDay(from), 14)
  normalized.to = setHours(startOfDay(to), 10)

  // Normalize message
  normalized.message = message !== "" ? message : "Nincs üzenet"

  // Normalize children
  normalized.children = children.reduce((acc, name) => {
    const i = acc.findIndex(({name: child}) => child === name)
    if (i !== -1) {
      acc[i].count +=1
    } else {
      acc.push({name, count: 1})
    }
    return acc
  }, [])

  return normalized
}