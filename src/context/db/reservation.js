import {
  areIntervalsOverlapping, differenceInCalendarDays, startOfDay, setHours
} from "date-fns"


export const getPrice = ({
  priceTable,
  foodService,
  adults, children,
  from, to
}) => {

  const numberOfAdults = priceTable?.[foodService]?.[adults]

  if (!numberOfAdults) return 0

  const numberOfChildren = children.filter(c => c === "6-12").length


  const price = numberOfAdults[numberOfChildren]?.price ?? 0

  if (from && to) {
    return price * differenceInCalendarDays(to, from)
  }

  return price
}

export const isAvailable = async (roomId, range) => {
  const response = await fetch(`https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?roomId=${roomId}`)
  const overlaps = await response.json()

  return !overlaps.some(({start, end}) => areIntervalsOverlapping({start: new Date(start), end: new Date(end)}, range))
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