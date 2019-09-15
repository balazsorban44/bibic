import {areIntervalsOverlapping} from "date-fns"


/**Check if a a given date interval for a room is overlapping with an existing reservation */
export default async function isAvailable(roomId, range) {
  const url = `https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?roomId=${roomId}`
  try {
    const overlaps = await (await fetch(url)).json()
    return !overlaps.some(interval => areIntervalsOverlapping(interval, range))
  } catch (error) {
    console.error(error)
    return false
  }
}