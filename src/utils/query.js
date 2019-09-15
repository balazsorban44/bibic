import QueryString from "query-string"
import {validators} from "./validate"
import {TOMORROW} from "./constants"
import {isDate} from "date-fns"
import {filterObject} from "utils"

export const stringify = (newParams, queryString="") => {
  const params = QueryString.parse(queryString)
  Object.entries(filterObject(newParams, queryParams)).forEach(([key, value]) => {
    params[key] = value
  })
  return QueryString.stringify(params)
}

export const parse = queryString =>
  Object.entries(QueryString.parse(queryString)).reduce((acc, [key, value]) => {
    acc[key] = valueToState(key, value)
    return acc
  }, {})

export const query = {stringify, parse}

export const queryParams = [
  // Reservation / message
  "roomId",
  "from",
  "to",
  "adults",
  "children",
  // Reservation
  "mealPlan",
  // Message
  "subject",
  // Feedback
  "id",
  "customId",
  "ratings",
  "coffee",
  "cleanliness",
  "comfort",
  "food",
  "services",
  "staff"
]


/**
 * Checks if the given query name sholud be in the URL
 * @param {string} name the name to be checked
 * @returns {boolean}
 */
export const isQueryString = name => queryParams.includes(name)


export const valueToState = (key, value) => {
  switch (key) {
  case "roomId":
    return parseInt(value, 10) || null
  case "adults":
    return parseInt(value, 10) || 1
  case "children":
    const ageGroups = ["0-6", "6-12"]
    return (typeof value === "string" && ageGroups.includes(value)) ? [value] :
      Array.isArray(value) ?
        value.filter(child => ageGroups.includes(child)) : []
  case "from":
  case "to":
    const date = new Date(value)
    return isDate(date) ? date : TOMORROW
  case "mealPlan":
    return ["breakfast", "halfBoard"].includes(value) ? value : "breakfast"
  case "subject":
    return validators.subject({subject: value}) ? value : "other"
  case "coffee":
  case "cleanliness":
  case "comfort":
  case "food":
  case "services":
  case "staff":
    return parseInt(value, 10) || 5
  default:
    return value
  }
}