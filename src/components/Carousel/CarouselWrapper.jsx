
import React from "react"
import makeCarousel from "react-reveal/makeCarousel"

const CarouselWrapper = makeCarousel(({position, handleClick, children}) =>
  <div className="carousel">{children}
    <span
      className="carousel-arrow carousel-arrow-prev"
      data-position={position - 1}
      onClick={handleClick}
    ><span className="arrow-icon"/></span>
    <span
      className="carousel-arrow carousel-arrow-next"
      data-position={position + 1}
      onClick={handleClick}
    ><span className="arrow-icon"/></span>
  </div>)

export default CarouselWrapper