import React, {Component} from 'react'
import Slider from 'react-slick'

export default class Gallery extends Component {

  render() {
    return (
      <section id="galeria">
      <h2>Galéria</h2>
      <Slider
        lazyLoad
        speed={800}
        className="gallery-slider"
      >
        {Array(30).fill(null).map((e, i) => (
          <img key={i} className="gallery-slide" alt="" src={`https://bibic-vendeghazak.github.io/web/assets/images/gallery/${i}.jpg`}/>
        ))}
      </Slider>
    </section>
    )
  }
}