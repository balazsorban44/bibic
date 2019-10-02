import React from "react"
import Carousel from "components/Carousel"
import Paragraphs from "components/Paragraphs"
import CERTIFICATES_BG from "assets/images/bg/intro.jpg"
import {GalleryItem} from "components/Gallery"
import useMedia from "ui/utils/useMedia"

const Sunflower = () => {
  const matches = useMedia("(min-aspect-ratio: 3/2)")

  return (
    <section id="napraforgo">
      <Paragraphs paragraphProps={{align: matches ? "right" : "left"}} type="tanusitvanyok"/>
      <Carousel
        className="gallery"
        item={GalleryItem}
        slider={false}
        type="tanusitvanyok"
      />
      <div className="cert-bg">
        <img
          alt="certificates background"
          src={CERTIFICATES_BG}
        />
      </div>
    </section>
  )
}


export default Sunflower