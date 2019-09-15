import React from "react"
import {useTranslation} from "react-i18next"

import Button from "components/Button"
import {GalleryItem} from "components/Gallery"
import Carousel from "components/Carousel"


const Services = () => {
  const [t] = useTranslation("services")
  return (
    <section id="szolgaltatasok">
      <h2>{t("title")}</h2>
      <Carousel
        className="gallery"
        count={3}
        item={GalleryItem}
        slider={false}
        type="szolgaltatasaink"
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