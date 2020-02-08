import React from "react"
import Carousel from "components/Carousel"
import Paragraphs from "components/Paragraphs"
import {GalleryItem} from "components/Gallery"
import useMedia from "ui/utils/useMedia"
import "./sunflower.sass"
import Section from "ui/Section"
const Sunflower = () => {
  const matches = useMedia("(min-aspect-ratio: 3/2)")

  return (
    <Section id="napraforgo">
      <Paragraphs paragraphProps={{align: matches ? "right" : "left"}} type="tanusitvanyok"/>
      <Carousel
        className="gallery"
        item={GalleryItem}
        slider={false}
        type="tanusitvanyok"
      />
    </Section>
  )
}


export default Sunflower