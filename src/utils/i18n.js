import {useEffect, useState} from "react"
import {useTranslation} from "react-i18next"
import config from "utils/env"
import {enGB as en, hu, de} from "date-fns/locale"

export const locales = {
  hu, en, de
}

export const getLocale = async (key) => {
  return locales[key]
  // if(key in locales) {
  //   return locales[key]
  // } else {
  //   const locale = await import(`date-fns/locale/${key}/index`)
  //   locales[key] = locale
  //   return locale
  // }
}

export const useLocale = () => {
  const {i18n} = useTranslation()
  const [locale, setLocale] = useState()


  useEffect(() => {
    (async () => {
      let language = i18n.language
      if (i18n.language === "en") {
        language = "en-GB"
      }
      const locale = await getLocale(language)
      setLocale(locale)
    })()
  }, [i18n.language])

  return locale
}


/**
 * Pretty prints a price in Hungarian format
 * @param {number} value the price
 * @returns {string}
 */
export const toLocalePrice = (value = 0, language = config.app.DEFAULT_LOCALE) => {
  let locale
  switch (language) {
  case "hu":
    locale = "hu-HU"
    break
  case "de":
    locale = "de-DE"
    break
  case "en":
    locale = "en-GB"
    break
  default:
    throw new TypeError(`Unknown language: ${language}.`)
  }

  return value.toLocaleString(locale, {
    style: 'currency',
    currency: 'HUF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

export const getPreferredLanguage = locale => {
  if (locale) {
    locale = locale.toLowerString().slice(0, 2)
    if (config.app.locales.includes(locale)) return locale
  }
  const preferredLanguage = (localStorage.getItem("bb:language") || navigator.language).toLowerCase().slice(0, 2)
  return config.app.locales.includes(preferredLanguage) ? preferredLanguage : config.app.DEFAULT_LOCALE
}