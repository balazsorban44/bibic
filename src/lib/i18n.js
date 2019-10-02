import i18n from "i18next"
import * as resources from "locales"
import {PREFERRED_LANGUAGE} from "utils/language"
import {initReactI18next} from "react-i18next"
import {TODAY} from "utils/constants"

let formatDate, hu, formatDistance


i18n
  .use(initReactI18next)
  .init({
    lng: PREFERRED_LANGUAGE(),
    fallbackLng: "hu",
    resources,
    fallbackNS: ["common", "form"],
    interpolation: {
      format: (value, type, lng) => {

        switch (type) {
        case "fullName": {
          const {family, given} = value
          return lng === "hu" ? `${family} ${given}` : `${given} ${family}`
        }
        case "dateLabel":
          switch(lng) {
          case "hu":
            return value ? formatDate(value, "yyyy. MMMM d.", {locale: hu, awareOfUnicodeTokens: true}) : "Nincs megadva"
          default:
            return value ? formatDate(value, "MMMM d, yyyy", {awareOfUnicodeTokens: true}) : "No value"
          }
        case "relative-date":
          return lng === "hu" ? formatDistance(value, TODAY, {locale: hu}) : formatDistance(value, TODAY)
        default:
          break
        }
      }
    }
  }).then(async () => {
    formatDate = (await import("date-fns/format")).default
    hu = (await import("date-fns/locale/hu")).default
    formatDistance = (await import("date-fns/formatDistance")).default
  })

export default i18n