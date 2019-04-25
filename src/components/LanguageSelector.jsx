import React, { useEffect, useRef, useContext } from 'react'
import { useTranslation } from 'react-i18next';
import FlagsSelect from "react-flags-select"
import "react-flags-select/css/react-flags-select.css"
import { Store } from 'db';
import { PREFERRED_LANGUAGE } from 'utils/language';
import {LANGUAGE_CHANGE} from 'db/actions';

export default () => {
  const flagSelect = useRef()
  const {dispatch} = useContext(Store)

  useEffect(() => {
    let country = "GB"
    const locale = PREFERRED_LANGUAGE()
    switch (locale) {
      case "hu":
      case "hu-HU":
      case "hu-hu":
        country = "HU"
        break;
      default: {
        break;
      }
    }
    country && flagSelect.current.updateSelected(country)
  }, [])
  const i18n = useTranslation()[1]


  const handleLanguageChange = countryCode => {
    let locale = "en"
    switch (countryCode) {
      case 'HU':
      locale = "hu"
      break
      default:
        break;
    }
    i18n.changeLanguage(locale, () => {
      localStorage.setItem("preferredLanguage", locale)
      dispatch({type: LANGUAGE_CHANGE, payload: locale})
    })
  }
  
  return(
    <li className="language-selector">
      <FlagsSelect
        ref={flagSelect}
        defaultCountry="HU"
        onSelect={handleLanguageChange}
        className="flags-select"
        countries={["GB", "HU"]}
        customLabels={{GB: "English", HU: "Magyar"}}
        selectedSize={22}
        optionsSize={22}
      />
    </li>
  )
}