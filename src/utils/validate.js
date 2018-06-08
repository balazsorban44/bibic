import moment from 'moment'


const nameRe = new RegExp(/[\s.áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z-]/)
const emailRe = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
const telRe = new RegExp(/[0-9-+\s]/)


export const valid = {
  roomId: (roomId=0, roomsLength) => (0 < roomId) && (roomId <= roomsLength),
  name: name => nameRe.test(name),
  email: email => emailRe.test(email),
  tel: tel => telRe.test(tel),
  address: address => typeof address === "string" && address.length > 0,
  message: message => typeof message === "string",
  messageMin: message => typeof message === "string" && message.length >= 60,
  from: from => from > moment().add(1, "day").startOf("day").valueOf(),
  to: to => to > moment().add(2, "day").startOf("day").valueOf(),
  period: (from, to) => moment(to).startOf("day").diff(moment(from).startOf("day"), "days") >= 1,
  adults: adults => typeof adults === "number" || adults >= 1,
  children: children => Array.isArray(children),
  peopleCount: (adults, children, maxPeople) => adults + children.length <= maxPeople,
  subject: subject => ["eventHall", "fullHouse", "special", "other"].includes(subject)
}


export const valueToState = (key, value) => {
  switch (key) {
    case "roomId":
      return parseInt(value, 10) || null
    case "adults":
      return parseInt(value, 10) || 1
    case "children":
      const ageGroups = ["0-6", "6-12"]
      return typeof value === "string" ?
         ageGroups.includes(value) ? [value] : [] :
         value.every(child => ageGroups.includes(child)) ? value : []
    case "from":
    case "to":
      const date = moment(value, "YYYY-MM-DD", true)
      return date.isValid()  ? date.toDate() : moment().toDate()
    case "activeService":
      return ["breakfast", "halfBoard"].includes(value) ? value : "breakfast"
    case "subject":
      return valid.subject(value) ? value : "other"
    default:
      return
  }
}