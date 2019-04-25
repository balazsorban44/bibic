import React from 'react'
import {Button} from './shared/Elements'
import Gallery from './shared/Gallery'


const Services = () =>
  <section id="szolgaltatasok">
    <h2>Szolgáltatásaink</h2>
    <Gallery
      count={3}
      path="szolgaltatasaink"
    />
    <div className="services-footer">
      <Button
        label="További szolgáltatásaink →"
        to="szolgaltatasok"
      />
    </div>
  </section>

export default Services