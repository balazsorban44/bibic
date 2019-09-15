import {useTranslation} from "react-i18next"
import {useEffect} from "react"

const useLanguage = lng => {
  const {i18n} = useTranslation()

  useEffect(() => {
    if (lng && i18n.language !== lng) i18n.changeLanguage(lng)
  }, [i18n, lng])

}

export default useLanguage

