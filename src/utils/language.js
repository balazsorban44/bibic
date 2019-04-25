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

export const LOCALES = ["hu"]

export const PREFERRED_LANGUAGE = locale => {
  if (LOCALES.includes(locale)) return locale
  const preferredLanguage = localStorage.getItem("preferredLanguage") || navigator.language
  return LOCALES.includes(preferredLanguage) ? preferredLanguage : "en"
}