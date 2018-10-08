import moment from 'moment'


const nameRe = new RegExp(/[\s.áéíóöőúüűÁÉÍÓÖŐÚÜŰa-zA-Z-]/)
const emailRe = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
const telRe = new RegExp(/[0-9-+\s]/)


export const valid = {
  roomId: (roomId=0, roomsLength) => (0 < roomId) && (roomId <= roomsLength),
  name: name => nameRe.test(name),
  email: email => emailRe.test(email),
  tel: tel => telRe.test(tel),
  address: address => typeof address === "string" && address.length,
  message: message => typeof message === "string",
  messageMin: message => typeof message === "string" && message.length >= 40,
  from: from => moment(from).diff(moment().add(1, "day").startOf("day"), "day"),
  to: to => moment(to).diff(moment().add(2, "day").startOf("day"), "day"),
  period: (from, to) => moment.range(from, to).snapTo("day").diff("day") >= 1,
  adults: adults => typeof adults === "number" && adults,
  children: children =>
    Array.isArray(children) &&
    (children.length === 0 ||
    children.every(child =>
      Object.keys(child).length === 2 &&
        child.name && child.count &&
        ["0-6", "6-12"].includes(child.name) && child.count
    )),
  peopleCount: (adults, children, maxPeople) => adults + children.reduce((acc, {count}) => acc+count, 0) <= maxPeople,
  subject: subject => ["eventHall", "fullHouse", "special", "other"].includes(subject)
}


export const isError = (roomId, roomLength, name, email, tel, address, from, to, message, adults, children, maxPeople) =>
  !valid.roomId(roomId, roomLength) ? "Érvénytelen szobaszám" :
    !valid.name(name) ? "Érvénytelen név" :
      !valid.email(email) ? "Érvénytelen e-mail cím" :
        !valid.tel(tel) ? "Érvénytelen telefonszám" :
          !valid.address(address) ? "Érvénytelen lakcím" :
            !valid.from(from) ? "Legkorábbi érkezés holnap" :
              !valid.to(to) ? "Legkorábbi távozás holnapután" :
                !valid.period(from, to) ? "A foglalás legalább egy éjszakát kell, hogy tartalmazzon" :
                  !valid.message(message) ? "Érvénytelen üzenet" :
                    !valid.adults(adults) ? "Érvénytelen felnőtt" :
                      !valid.children(children) ? "Érvénytelen gyerek" :
                        !valid.peopleCount(adults, children, maxPeople) ? "A személyek száma nem haladhatja meg a szoba kapacitását" :
                          false

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
    return date.isValid() ? date.toDate() : moment().toDate()
  case "foodService":
    return ["breakfast", "halfBoard"].includes(value) ? value : "breakfast"
  case "subject":
    return valid.subject(value) ? value : "other"
  default:
    return
  }
}