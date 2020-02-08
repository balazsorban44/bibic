export const translations = {
  // Reservation / message
  roomId: ["szoba", true],
  name: ["nev", false],
  tel: ["telefon", false],
  email: ["email", false],
  address: ["lakcim", false],
  from: ["tol", true],
  to: ["ig", true],
  adults: ["felnott", true],
  children: ["gyerek", true],
  // Reservation
  foodService: ["ellatas", true],
  breakfast: ["reggeli", false],
  halfBoard: ["felpanzio", false],
  fullBoard: ["teljes-ellatas", false],
  allInclusive: ["all-inclusive", false],
  // Message
  subject: ["tema", true],
  message: ["uzenet", false],
  eventHall: ["rendezvenyterem", false],
  special: ["kulonajanlat", false],
  fullHouse: ["teljeshaz", false],
  other: ["egyeb", false],
  // Feedback
  id: ["id", true],
  customId: ["customId", true],
  rating: ["rating", true],
  coffee: ["kávé", false],
  cleanliness: ["tisztaság", false],
  comfort: ["komfort", false],
  food: ["étel", false],
  services: ["szolgáltatások", false],
  staff: ["személyzet", false]
}

/**
 * Translates a query name to either English or Hungarian,
 * depending on the input
 * @param {name} name the name to be translated
 * @returns {string}
 */
export const translate = name => {
  if (translations[name]) {
    return translations[name][0]
  } else {
    return Object.keys(translations).find(key => translations[key][0] === name)
  }
}

/**
 * Checks if the given query name sholud be in the URL
 * @param {string} name the name to be checked
 * @returns {boolean}
 */
export const isQueryString = name => translations[name] ? translations[name][1] : false

/**
 * Pretty prints a price in Hungarian format
 * @param {number} value the price
 * @returns {string}
 */
export const toPrice = value => (
  (value || 0).toLocaleString('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
)

export const LOCALES = ["hu", "en", "de"]

export const PREFERRED_LANGUAGE = locale => {
  if (locale) {
    locale = locale.toLowerString().slice(0, 2)
    if (LOCALES.includes(locale)) return locale
  }
  const preferredLanguage = (localStorage.getItem("bb:language") || navigator.language).toLowerCase().slice(0, 2)
  return LOCALES.includes(preferredLanguage) ? preferredLanguage : "en"
}