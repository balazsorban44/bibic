import React, {useEffect} from 'react'
import Gallery from 'components/Gallery'
import {useTranslation} from 'react-i18next'


const Facilities = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [t] = useTranslation()
  return (
    <section id="szolgaltatasok">
      <h2>{t("facilities.title")}</h2>
      <Gallery section="facilities"/>
    </section>
  )
}

export default Facilities