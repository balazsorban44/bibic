import {differenceInCalendarDays} from "date-fns"


/**Get the price of a room */
export default function getPrice(reservation, room) {
  let price= 0
  if (!room || !reservation) return price
  else {
    const {mealPlan, from, to} = reservation
    const adults = room.prices.table[mealPlan][reservation.adults]

    if (!adults) return price

    const children = reservation.children.filter(child => child==="6-12").length

    if (children) {
      price = adults[children].price
    } else {
      price = adults[0].price
    }
    // If interval chosen, price times the days
    if (from && to) {
      return price * differenceInCalendarDays(to, from)
    } else return price
  }
}