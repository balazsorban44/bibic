import {TOMORROW} from './env'
import {
  isAfter, differenceInCalendarDays, startOfDay, endOfDay, addDays, isWithinInterval
} from 'date-fns'


export const nameRe = new RegExp(/^[\s.áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z-]+$/)
export const emailRe = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
export const telRe = new RegExp(/^\+?[0-9- ]+$/)
export const addressRe = new RegExp(/[\s.\-,/áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z0-9]+$/)

export const validContent = value => typeof value === 'string' && !!value.length


export const valid = {
  roomId: (roomId=0, roomsLength) => (0 < roomId) && (roomId <= roomsLength),
  name: name => nameRe.test(name),
  email: email => emailRe.test(email),
  tel: tel => telRe.test(tel),
  address: address => typeof address === "string" && addressRe.test(address),
  message: message => typeof message === "string",
  // messageMin: message => typeof message === "string" && message.length >= 40,
  from: from => isAfter(from, TOMORROW),
  to: to => isAfter(to, addDays(TOMORROW, 2)),
  period: (from, to) => differenceInCalendarDays(endOfDay(to), startOfDay(from)) >= 1,

  subject: subject => ["eventHall", "fullHouse", "special", "other"].includes(subject),
  ratings: ratings =>
    Object.entries(ratings)
      .every(([key, value]) =>
        ["coffee", "cleanliness", "comfort", "food", "services", "staff"]
          .includes(key) && valid.rating(value)),
  rating: rating => rating > 0 && rating < 6,
  content: content => ["string", "undefined"].includes(typeof content),
  id: id => typeof id === "string",
  overlaps: (overlaps, start, end) => {
    const interval = {start, end}
    return overlaps.some(day => isWithinInterval(day, interval))
  }
}

