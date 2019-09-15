import React from "react"


const CarouselItem = ({title, desc, SIZE_640, SIZE_1024, SIZE_1440, SIZE_ORIGINAL, className}) =>
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


export default CarouselItem