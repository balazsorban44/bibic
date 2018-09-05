import React from 'react'
import {Button} from './shared/Elements'
import Gallery from './shared/Gallery'


const Services = () =>
  <section id="szolgaltatasok">
    <h2>Szolgáltatásaink</h2>
    <Gallery
      count={3}
      item={ServiceItem}
      path="szolgaltatasaink"
    />
    <div className="services-footer">
      <p>Az aktív pihenést kedvelőknek ping pong asztal és kerékpárok, a gyermekeknek játszótér áll rendelkezésére.</p>
      <Button
        label="További szolgáltatásaink →"
        to="szolgaltatasok"
      />
    </div>
  </section>

export default Services

export const ServiceItem = ({
  SIZE_1024, SIZE_1440, SIZE_640, desc, title
}) =>
  <div className="service-item">
    <div className="img-wrapper">
      <picture>
        <source
          media="(min-width: 960px)"
          srcSet={SIZE_1024}
        />
        <source
          media="(min-width: 1280px)"
          srcSet={SIZE_1440}
        />
        <img
          alt={desc !== "" ? desc : title}
          src={SIZE_640}
        />
      </picture>
    </div>
    <p>{desc}</p>
  </div>