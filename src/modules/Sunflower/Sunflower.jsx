import React from "react"
import Carousel from "components/Carousel"
import Paragraphs from "components/Paragraphs"
import CERTIFICATES_BG from "assets/images/bg/intro.jpg"
import {GalleryItem} from "components/Gallery"

const Sunflower = () =>
  <section id="napraforgo">
    <Paragraphs type="tanusitvanyok"/>
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


export default Sunflower