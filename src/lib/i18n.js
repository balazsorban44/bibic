import i18n from "i18next"
import {initReactI18next} from "react-i18next"
import resources from "locales"
import {format as dateFnsFormat} from "date-fns"

import {getPreferredLanguage, locales} from "utils/i18n"
import config from "utils/env"


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getPreferredLanguage(),
    fallbackLng: config.app.DEFAULT_LOCALE,
    appendNamespaceToMissingKey: true,
    interpolation: {
      format: (value, format, lng) => {
        if (format === "date") {
          return dateFnsFormat(
            value.value,
            value.format ?? "yyyy-MM-dd",
            {locale: locales[lng]}
          )
        }
      }
    }
  })

export default i18n