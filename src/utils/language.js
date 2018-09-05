export const translations = {
  roomId: ["szoba", true],
  name: ["nev", false],
  tel: ["telefon", false],
  email: ["email", false],
  address: ["lakcím", false],
  from: ["tol", true],
  to: ["ig", true],
  adults: ["felnott", true],
  children: ["gyerek", true],
  activeService: ["ellatas", true],
  breakfast: ["reggeli", false],
  halfBoard: ["felpanzio", false],
  fullBoard: ["teljes-ellatas", false],
  allInclusive: ["all-inclusive", false],
  subject: ["tema", true],
  message: ["uzenet", false],
  eventHall: ["rendezvenyterem", false],
  special: ["kulonajanlat", false],
  fullHouse: ["teljeshaz", false],
  other: ["egyeb", false]
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
export const isQueryString = name => translations[name][1]

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