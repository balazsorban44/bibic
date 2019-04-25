import {startOfDay, setHours, areIntervalsOverlapping} from "date-fns"


export const isAvailable = (roomId, range) =>
  fetch(`https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?roomId=${roomId}`)
    .then(res => res.json())
    .then(overlaps =>
      !overlaps.some(interval => areIntervalsOverlapping(interval, range))
    )


/**
 * First validates, then sends the reservation to the server
 * @param {object} reservation the reservation to be submitted
 * @param {function} loading to set the state if reserving
 * @param {function} close close reservation form
 * @param {array} rooms rooms to choose from
 */
export const submit = ({reservation, loading, close, notify}) => {
  const r = normalize(reservation)
  loading(true)
  const {roomId, from, to} = r
  isAvailable(roomId, {start: from, end: to}).then(available => {
    if (available === true) {
      console.log(r)
      loading(false)
      close()
      // import("lib/firebase").then(({RESERVATIONS_FS_REF, TIMESTAMP}) =>
      // RESERVATIONS_FS_REF
      //   .add({
      //     ...r,
      //     id: `${format(from, "YYYYMMdd", {awareOfUnicodeTokens: true})}-sz${roomId}`,
      //     roomId: [roomId],
      //     lastHandledBy: "",
      //     timestamp: TIMESTAMP,
      //     handled: false,
      //     archived: false
      //   })
      //   .then(() => {
      //     loading(false)
      //     notify("reservation.submit-success", {type: "success"})
      //     setTimeout(() => {
      //       close()
      //       reset()
      //       return true
      //     }, 7500)
      //   })
      //   .catch(e => {
      //     loading(false)
      //     notify("reservation.submit-error", {type: "error", message: e.message})
      //     return false
      //   })
      // )
    } else {
      loading(false)
      notify("reservation.overlap", {type: "error"})
      return false
    }
  }).catch(e => {
    loading(false)
    notify("reservation.submit-error", {type: "error", message: e.message})
    return false
  })
}

/**
 * Some properties in the reservation is handled
 * differently on the client then on the server for
 * simplicity. Before submitting though, the client
 * should match the server to pass validation.
 * @param {object} reservation - client side formatting
 * @returns {object} - normalized reservation matching the server
 */
export const normalize = reservation => {
  // Copy reservation to prevent modifying the original one
  const normalized = {...reservation}
  const {from, to, message, children, mealPlan, phone} = reservation

  // mealPlan => foodService // NOTE: Can be removed when renaming is done on backend
  normalized.foodService = mealPlan
  delete normalized.mealPlan

  // tel => phone // NOTE: Can be removed when renaming is done on backend
  normalized.tel = phone
  delete normalized.phone

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