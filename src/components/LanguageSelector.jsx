import React, {useEffect, useRef} from 'react'
import {useTranslation} from 'react-i18next'
import FlagsSelect from "react-flags-select"
import "./language-selector.sass"
import "react-flags-select/css/react-flags-select.css"
import {getPreferredLanguage} from 'utils/i18n'


const getCountry = () => {
  let country = getPreferredLanguage().toUpperCase()
  if (country === "EN") {
    country = "GB"
  }
  return country
}

const LanguageSelector = () => {
  const flagSelect = useRef()

  useEffect(() => {
    flagSelect.current.updateSelected(getCountry())
  }, [])
  const i18n = useTranslation()[1]


  const handleLanguageChange = countryCode => {
    let locale = countryCode.toLowerCase()
    if (locale === "gb") {
      locale = "en"
    }
    i18n.changeLanguage(locale, () => {
      localStorage.setItem("bb:language", locale)
    })
  }

  return(
    <li className="language-selector">
      <FlagsSelect
        className="flags-select"
        countries={["HU", "GB", "DE"]}
        customLabels={{HU: "Magyar", GB: "English", "DE": "Deutsch"}}
        defaultCountry={getCountry()}
        onSelect={handleLanguageChange}
        optionsSize={22}
        ref={flagSelect}
        selectedSize={22}
      />
    </li>
  )
}

export default LanguageSelector