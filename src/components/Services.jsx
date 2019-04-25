import React from 'react'
import {Button} from 'components/shared/Elements'
import Gallery from 'components/shared/Gallery'
import { useTranslation } from 'react-i18next';


const Services = () => {
  const [t] = useTranslation("services")
  return (
    <section id="szolgaltatasok">
      <h2>{t("title")}</h2>
      <Gallery
        count={3}
        path="szolgaltatasaink"
      />
      <div className="services-footer">
        <Button
          label={t("more")}
          to="szolgaltatasok"
        />
      </div>
    </section>
  )
}

export default Services