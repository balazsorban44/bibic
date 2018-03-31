import moment from 'moment'
export const translations = {
    roomId: ["szoba", true],
    name: ["nev", true],
    tel: ["telefon", false],
    email: ["email", false],
    from: ["erkezes", true],
    to: ["tavozas", true],
    adults: ["felnott", true],
    children: ["gyerek", true],
    activeService: ["ellatas", true],
    breakfast: ["reggeli", true],
    halfBoard: ["felpanzio", true],
    fullBoard: ["teljes-ellatas", true],
    allInclusive: ["all-inclusive", true],
    message: ["uzenet", false]
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


export const transformQueryToState = object => {
    
    let transformed = {}
    
    Object.keys(object).forEach(name => {
        transformed[translate(name)] = object[name]
    })
    Object.keys(transformed).forEach(name => {
        transformed[name] = transform(name, transformed[name])
    })
    
    return transformed
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
export const price = value => (
    (value).toLocaleString('hu-HU', {
        style: 'currency',
        currency: 'HUF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })
)


const transform = (name, value) => {
    switch (name) {
        case "roomId":
            return parseInt(value, 10) || null        
        case "from":
            return moment(value).format("YYYY-MM-DD")
        case "to":
            return moment(value).format("YYYY-MM-DD")
        case "adults":
            return parseInt(value, 10) || 1
        case "children":
            return parseInt(value, 10) || 0
        default:
            return null
    }
}