import {differenceInCalendarDays} from "date-fns"

/**
 *
 * @param {*} reservation
 * @param {*} room
 */
export default function getPrice (reservation, room) {
  let price = 0
  if (!room || !reservation) return price
  else {
    const {mealPlan, from, to} = reservation
    let {adults, children} = {...reservation}
    adults = room.prices.table[mealPlan][adults]
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
}
