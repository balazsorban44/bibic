import {TOMORROW, TODAY, NUMBER_OF_ROOMS} from './constants'
import {
  isAfter,
  differenceInCalendarDays,
  startOfDay,
  endOfDay
} from 'date-fns'
import getPrice from 'db/reservation/getPrice'


const nameRe = new RegExp(/[\s.áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z-]+/)
const emailRe = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
const phoneRe = new RegExp(/^\+?[0-9-\s]+/)
const addressRe = new RegExp(/[\s.\-,/áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z0-9]+/)

export const validator = {
  roomId: ({roomId=0}) => (0 < roomId) && (roomId <= NUMBER_OF_ROOMS),
  name: ({name}, _, strict) => (!strict && name === "") || nameRe.test(name),
  email: ({email}, _, strict) => (!strict && email === "") || emailRe.test(email),
  phone: ({phone}, _, strict) => (!strict && phone === "") || phoneRe.test(phone),
  address: ({address}, _, strict) => (!strict && address === "") || addressRe.test(address),
  mPhone: ({phone}) => phone === "" || phoneRe.test(phone),
  mAddress: ({address}) => address === "" || addressRe.test(address),
  message: ({message}) => typeof message === "string",
  from: ({from}) => isAfter(from, TODAY),
  to: ({to}) => isAfter(to, TOMORROW),
  period: ({from, to}) => differenceInCalendarDays(endOfDay(to), startOfDay(from)) >= 1,
  adults: ({adults}) => typeof adults === "number" && adults,
  children: ({children}) => Array.isArray(children) &&
    children.every(child => ["0-6", "6-12"].includes(child)),
  peopleCount: ({adults, children}, {maxPeople}) => adults + children.length <= maxPeople,
  subject: ({subject}) => ["eventHall", "fullHouse", "special", "other"].includes(subject),
  mealPlan: ({mealPlan}) => ["breakfast", "halfBoard"].includes(mealPlan),
  coffee: ({coffee}) => validator.rating(coffee),
  cleanliness: ({cleanliness}) => validator.rating(cleanliness),
  comfort: ({comfort}) => validator.rating(comfort),
  food: ({food}) => validator.rating(food),
  services: ({services}) => validator.rating(services),
  staff: ({staff}) => validator.rating(staff),
  rating: rating => rating >= 0 && rating < 6,
  content: ({content}) => typeof content === "string" && content.length,
  id: ({id}) => typeof id === "string",
  customId: ({customId}) => typeof customId === "string" && customId.startsWith("sz-"),
  price: ({price, ...reservation}, {room}) => typeof price === "number" && price === getPrice(reservation, room)
}


export const validate = (validations, reservation, validatorDependencies) =>
  validations.filter(name => !validator[name](reservation, validatorDependencies, true))