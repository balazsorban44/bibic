import React, {useEffect} from 'react'
import Gallery from 'components/shared/Gallery'
import { useTranslation } from 'react-i18next';


export default function MoreServices() {
  const [t] = useTranslation("services")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

    return(
      <section id="szolgaltatasok">
        <h2>{t("title")}</h2>
        <Gallery path="szolgaltatasaink"/>
      </section>
    )
}