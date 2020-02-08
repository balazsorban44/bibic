import React from 'react'
import {Button} from './shared/Elements'
import Gallery from './shared/Gallery'
import {useTranslation} from 'react-i18next'


const Services = () => {
  const [t] = useTranslation()
  return (
    <section id="szolgaltatasok">
      <h2>{t("facilities.title")}</h2>
      <Gallery
        count={3}
        path="szolgaltatasaink"
      />
      <div className="services-footer">
        <Button
          label={t("facilities.more")}
          to="szolgaltatasok"
        />
      </div>
    </section>
  )
}

export default Services