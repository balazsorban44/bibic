import React, {Component} from 'react'
import withRouter from 'react-router/withRouter'
import Slide from "react-reveal/Slide"
import makeCarousel from "react-reveal/makeCarousel"
import {withStore} from '../db'
import {Loading} from './Elements'

export class Carousel extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    let {match: {path}} = this.props
    const {title, galleries} = this.props
    path = path.replace("/", "")
    const children = galleries[path] ?
      Object
        .values(galleries[path])
        .map((itemProps, key) =>
          <Slide
            key={key}
            right
          >
            <CarouselItem
              className="carousel-item"
              {...itemProps}
            />
          </Slide>
        ) :
      <Loading/>
    return(
      <section
        className="carousel-wrapper"
        id={path}
      >
        <h2>{title}</h2>
        <CarouselWrapper defaultWait={10000}>
          {children}
        </CarouselWrapper>
      </section>
    )}
}

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

export default withRouter(withStore(Carousel))


export const CarouselItem = ({
  title, desc, SIZE_640, SIZE_1280, SIZE_1440, SIZE_ORIGINAL, className
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
          media="(max-width: 1280px)"
          srcSet={SIZE_1280}
        />
        <source
          media="(max-width: 1920px)"
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
