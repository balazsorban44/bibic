import React, {Component, Fragment} from 'react'
import Gallery from './Gallery'
import withRouter from 'react-router/withRouter'
import {BackMenu} from '../Menu'
import {Next, Prev} from './Elements'
import Carousel from 'nuka-carousel'


class Carousel extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    let {path} = this.props.match
    path = path.replace("/", "")
    return(
      <Fragment>
        <BackMenu/>
        <section id={path}>
          <h2>Ételeink</h2>
          <Gallery
            component={Carousel}
            componentProps={{
              // autoplay: true,
              wrapAround: true,
              className: "foods",
              heightMode: "max",
              cellSpacing: 40,
              renderCenterRightControls: Next,
              renderCenterLeftControls: Prev,
              renderTopRightControls: Next,
              renderTopLeftControls: Prev
            }}
            item={FoodItem}
            path={path}
          />
        </section>
      </Fragment>
    )}
}

export default withRouter(Carousel)


const FoodItem = ({
  title, desc, SIZE_640, SIZE_1280, SIZE_1440, SIZE_ORIGINAL
}) =>
  <div className="food">
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
    <div className="food-desc">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  </div>