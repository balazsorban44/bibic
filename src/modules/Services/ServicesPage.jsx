import React from "react"
import {GalleryItem} from "components/Gallery"
import {useTranslation} from "react-i18next"
import useScrollTo from "hooks/useScrollTo"
import Carousel from "components/Carousel"


const ServicesPage =() => {
  const [t] = useTranslation("services")

  useScrollTo(0,0)

  return(
    <section id="szolgaltatasok">
      <h2>{t("title")}</h2>
      <Carousel
        className="gallery"
        item={GalleryItem}
        slider={false}
        type="szolgaltatasaink"
      />
    </section>
  )
}

export default ServicesPage