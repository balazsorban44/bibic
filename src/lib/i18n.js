import i18n from "i18next"
import * as resources from "locales"
import {PREFERRED_LANGUAGE} from "utils/language"

let formatDate, hu
i18n.init({
  lng: PREFERRED_LANGUAGE(),
  fallbackLng: "hu",
  resources,
  fallbackNS: ["common", "form"],
  interpolation: {
    format: (value, type, lng) => {

      switch (type) {
      case "fullName":
        switch (lng) {
        case "hu":
          return `${value.surname} ${value.firstName}`
        default:
          return `${value.firstName} ${value.surname}`
        }
      case "dateLabel":
        switch(lng) {
        case "hu":
          return value ? formatDate(value, "YYYY. MMMM d.", {locale: hu, awareOfUnicodeTokens: true}) : "Nincs megadva"
        default:
          return value ? formatDate(value, "MMMM d, YYYY", {awareOfUnicodeTokens: true}) : "No value"
        }
      default:
        break
      }
    }
  }
}).then(async () => {
  formatDate = (await import("date-fns")).format
  hu = await import("date-fns/locale/hu")
})

export default i18n