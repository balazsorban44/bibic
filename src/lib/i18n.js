import i18n from "i18next"
import {initReactI18next} from "react-i18next"
import resources from "locales"
import {format as dateFnsFormat} from "date-fns"
import {hu, enGB, de} from "date-fns/locale"
import {PREFERRED_LANGUAGE} from "utils/language"

export const dateFnsLocales = {
  hu,
  en: enGB,
  de
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: PREFERRED_LANGUAGE(),
    fallbackLng: "hu",
    appendNamespaceToMissingKey: true,
    interpolation: {
      format: (value, format, lng) => {
        if (format === "date") {
          return dateFnsFormat(
            value.value,
            value.format ?? "yyyy-MM-dd",
            {locale: dateFnsLocales[lng]}
          )
        }
      }
    }
  })

export default i18n