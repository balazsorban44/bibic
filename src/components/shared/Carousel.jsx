import React, {Component} from 'react'
import Gallery from './Gallery'
import withRouter from 'react-router/withRouter'
import {Next, Prev} from './Elements'
import NukaCarousel from 'nuka-carousel'


export class Carousel extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    let {match: {path}} = this.props
    const {
      className, itemClassName, title
    } = this.props
    path = path.replace("/", "")
    return(
      <section
        className="carousel-section"
        id={path}
      >
        <h2>{title}</h2>
        <Gallery
          className={`${className} carousel`}
          component={NukaCarousel}
          componentProps={{
            // autoplay: true,
            wrapAround: true,
            // slidesToShow: 2,
            cellAlign: "center",
            heightMode: "max",
            cellSpacing: 40,
            renderCenterRightControls: Next,
            renderCenterLeftControls: Prev,
            renderTopRightControls: Next,
            renderTopLeftControls: Prev
          }}
          {...itemClassName}
          item={CarouselItem}
          path={path}
        />
      </section>
    )}
}

export default withRouter(Carousel)


export const CarouselItem = ({
  title, desc, SIZE_640, SIZE_1280, SIZE_1440, SIZE_ORIGINAL, itemClassName: className
}) =>
  <div className={`${className} carousel-item`}>
    <picture>
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
    <div className={`${className}-desc carousel-item-desc`}>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  </div>