import {TOMORROW, TODAY, NUMBER_OF_ROOMS} from "./constants"
import {
  isAfter,
  differenceInCalendarDays,
  startOfDay,
  endOfDay,
  isWithinInterval
} from "date-fns"


const nameRe = new RegExp(/[\s.áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z-]+/)
const emailRe = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
const phoneRe = new RegExp(/^\+?[0-9-\s]+/)
const addressRe = new RegExp(/[\s.\-,/áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z0-9]+/)


export const subjects = {
  EVENT_HALL: "eventHall",
  FULL_HOUSE: "fullHouse",
  SPECIAL: "special",
  OTHER: "other"
}

export const mealPlans = {
  BREAKFAST: "breakfast",
  HALF_BOARD: "halfBoard"
}

const isString = value => typeof value === "string"
export const rating = value => !isNaN(value) && value > 0 && value < 6
export const reservationId = isString
export const lng = value => ["en", "hu"].includes(value)
const childAgeGroups = ["0-6", "6-12"]

export const validators = (overlaps) => (fields, submitting) => ({
  roomId: !isNaN(fields.roomId) && 0 < fields.roomId && fields.roomId <= NUMBER_OF_ROOMS,
  name: (!submitting && fields.name === "") || nameRe.test(fields.name),
  email: (!submitting && fields.email === "") || emailRe.test(fields.email),
  phone: (!submitting && fields.phone === "") || phoneRe.test(fields.phone),
  address: (!submitting && fields.address === "") || addressRe.test(fields.address),
  country: true,
  message: isString(fields.message),
  from: isAfter(fields.from, TODAY),
  to: isAfter(fields.to, TOMORROW),
  overlap: overlaps.every(overlap => !isWithinInterval(overlap, {start: fields.from, end: fields.to})),
  night: differenceInCalendarDays(endOfDay(fields.to), startOfDay(fields.from)) >= 1,
  adults: !isNaN(fields.adults) && !!fields.adults,
  children: Array.isArray(fields.children) && fields.children.every(child => childAgeGroups.includes(child)),
  subject: Object.values(subjects).includes(fields.subject),
  mealPlan: Object.values(mealPlans).includes(fields.mealPlan),
  coffee: rating(fields.coffee),
  cleanliness: rating(fields.cleanliness),
  comfort: rating(fields.comfort),
  food: rating(fields.food),
  services: rating(fields.services),
  staff: rating(fields.staff),
  content: isString(fields.content) && fields.content !== "",
  id: isString(fields.id),
  customId: isString(fields.customId) && fields.customId.startsWith("sz-"),
  // TODO:
  price: true,
  // price: ({price, ...reservation}, {room}) => !isNaN(_.price) && price === getPrice(reservation, room),
  lng: lng(fields.lng)
})


export const validate = (validations, reservation, validatorsDependencies) =>
  validations.filter(name => !validators[name](reservation, validatorsDependencies, true))