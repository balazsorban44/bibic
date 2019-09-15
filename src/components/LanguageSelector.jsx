import React, {useEffect, useRef} from "react"
import {useTranslation} from "react-i18next"
import FlagsSelect from "react-flags-select"
import "react-flags-select/css/react-flags-select.css"
import {PREFERRED_LANGUAGE} from "utils/language"

export default () => {
  const flagSelect = useRef()

  useEffect(() => {
    let country
    switch (
      PREFERRED_LANGUAGE()
        .toLowerCase()
    ) {
    case "hu":
    case "hu-hu":
      country = "HU"
      break
    default: {
      country = "GB"
      break
    }
    }
    country && flagSelect.current.updateSelected(country)
  }, [])
  const i18n = useTranslation()[1]


  const handleLanguageChange = countryCode => {
    let locale = "en"
    switch (countryCode) {
    case "HU":
      locale = "hu"
      break
    default:
      break
    }
    i18n.changeLanguage(locale, () => {
      localStorage.setItem("preferredLanguage", locale)
    })
  }

  return(
    <li className="language-selector">
      <FlagsSelect
        className="flags-select"
        countries={["GB", "HU"]}
        customLabels={{GB: "English", HU: "Magyar"}}
        defaultCountry="HU"
        onSelect={handleLanguageChange}
        ref={flagSelect}
        selectedSize={22}
      />
    </li>
  )
}