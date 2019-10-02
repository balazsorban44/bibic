import React from "react"

import Slide from "react-reveal/Slide"

import Loading from "ui/Loading"
import useScrollTo from "hooks/useScrollTo"

import CarouselWrapper from "./CarouselWrapper"
import DefaultCarouselItem from "./CarouselItem"
import useGallery from "hooks/data/useGallery"

export const Carousel = ({type, title, subtitle, className, item, slider=true, count}) => {
  const CarouselItem = item || DefaultCarouselItem

  useScrollTo(0,0)

  const [gallery] = useGallery(type)


  const children =
    Object.values(gallery)
      .slice(0, count)
      .map((item, key) =>
        slider ?
          <Slide key={key} right>
            <CarouselItem className="carousel-item" {...item} />
          </Slide> :
          <CarouselItem className="carousel-item" key={key} {...item} />
      )

  return (
    <div className={className || "carousel-wrapper"} id={type}>
      {title ?
        <div className="title">
          <h2>{title}</h2>
        </div> : null
      }
      {children ?
        slider ?
          <CarouselWrapper defaultWait={10000}>
            {children}
          </CarouselWrapper> :
          children :
        // REVIEW:  turn to component
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Loading/>
        </div>
      }
      {subtitle ? <h3>{subtitle}</h3> : null }
    </div>
  )
}

export default Carousel

