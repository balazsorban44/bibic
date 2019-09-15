import {TOMORROW, TODAY, NUMBER_OF_ROOMS} from "./constants"
import {
  isAfter,
  differenceInCalendarDays,
  startOfDay,
  endOfDay
} from "date-fns"


const nameRe = new RegExp(/[\s.áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z-]+/)
const emailRe = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
const phoneRe = new RegExp(/^\+?[0-9-\s]+/)
const addressRe = new RegExp(/[\s.\-,/áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z0-9]+/)


export const subjects = {
  EVENT_HALL: "eventHall",
  FULL_HOUSE: "fullHouse",
  SPECIAL: "special",
  OTHER:  "other"
}

export const mealPlans = {
  BREAKFAST: "breakfast",
  HALF_BOARD: "halfBoard"
}

export const rating = value => typeof value === "number" && value > 0 && value < 6
export const reservationId = value => typeof value === "string"
export const lng = value => ["en", "hu"].includes(value)

export const validators = (_, submitting) => ({
  roomId: typeof _.roomId === "number" && 0 < _.roomId && _.roomId <= NUMBER_OF_ROOMS,
  name:  typeof _.name && (submitting ? nameRe.test(_.name) : true),
  email: typeof _.email && (submitting ? emailRe.test(_.email) : true),
  phone: typeof _.phone && (submitting ? phoneRe.test(_.phone) : true),
  address: typeof _.address && (submitting ? addressRe.test(_.address) : true),
  country:  true,
  message:  typeof _.message === "string",
  from:  isAfter(_.from, TODAY),
  to:  isAfter(_.to, TOMORROW),
  period:  differenceInCalendarDays(endOfDay(_.to), startOfDay(_.from)) >= 1,
  adults:  typeof _.adults === "number" && !!_.adults,
  children:  Array.isArray(_.children) && _.children.every(child => ["0-6", "6-12"].includes(child)),
  subject:  Object.values(subjects).includes(_.subject),
  mealPlan:  Object.values(mealPlans).includes(_.mealPlan),
  coffee: rating(_.coffee),
  cleanliness: rating(_.cleanliness),
  comfort: rating(_.comfort),
  food: rating(_.food),
  services: rating(_.services),
  staff: rating(_.staff),
  content:  typeof _.content === "string" && _.content !== "",
  id:  typeof _.id === "string",
  customId:  typeof _.customId === "string" && _.customId.startsWith("sz-"),
  // TODO:
  price:  true,
  // price: ({price, ...reservation}, {room}) => typeof _.price === "number" && price === getPrice(reservation, room),
  lng: lng(_.lng)
})


export const validate = (validations, reservation, validatorsDependencies) =>
  validations.filter(name => !validators[name](reservation, validatorsDependencies, true))