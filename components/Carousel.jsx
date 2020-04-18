import React, {useEffect} from 'react'
import Slide from "react-reveal/Slide"
import makeCarousel from "react-reveal/makeCarousel"

const Carousel = ({title, subtitle, data: gallery}) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const children = gallery
    .map((itemProps, key) =>
      <Slide key={key} right>
        <CarouselItem
          className="carousel-item"
          {...itemProps}
        />
      </Slide>
    )

  return(
    <section
      className="carousel-wrapper"
      id={title}
    >
      <div className="title">
        <h2>{title}</h2>
      </div>
      <CarouselWrapper defaultWait={10000}>
        {children}
      </CarouselWrapper>
      {subtitle ? <h3>{subtitle}</h3> : null}
    </section>
  )
}

export default Carousel

const CarouselWrapper = makeCarousel(({
  position, handleClick, children
}) =>
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


export const CarouselItem = ({
  title, desc, SIZE_640, SIZE_1024, SIZE_1440, SIZE_ORIGINAL, className
}) =>
  <div className={className}>
    <span>
      <img
        alt="blurred background"
        className="carousel-item-bg"
        src={SIZE_640}
      />
    </span>
    <div className="carousel-item-picture">
      <picture
        className="carousel-item-img"
      >
        <source
          media="(max-width: 640px)"
          srcSet={SIZE_640}
        />
        <source
          media="(max-width: 1024px)"
          srcSet={SIZE_1024}
        />
        <source
          media="(max-width: 1440px)"
          srcSet={SIZE_1440}
        />
        <img
          alt={title}
          src={SIZE_ORIGINAL}
        />
      </picture>
    </div>
    {desc ?
      <div className="carousel-item-desc">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div> : null
    }
  </div>
