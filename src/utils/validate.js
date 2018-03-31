export const nameRe = new RegExp(/[\s.áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z-]/)
export const emailRe = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
export const telRe = new RegExp(/[0-9-+\s]/)


export const isValid = (name, value) => {
  switch (name) {
    case "name": return nameRe.test(value)
    case "email": return emailRe.test(value)
    case "tel": return telRe.test(value)
    case "address": return value !== ""
    case "adults": return validateAdults(value)
    case "children": return validateChildren(value)
    default: return true
  }
}



const validateAdults = value => {
  if (typeof value === "string") {
    parseInt(value, 10)
  }
  return value >= 1
}

const validateChildren = value => {
  if (typeof value === "string") {
    parseInt(value, 10)
  }
  return value > 0
}