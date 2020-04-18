import React from 'react'
import Gallery from 'components/Gallery'
import Link from "next/link"

const Facilities = ({images}) =>
  <section id="szolgaltatasok">
    <h2>Szolgáltatásaink</h2>
    <Gallery images={images}/>
    <div className="services-footer">
      <Link
        as="/szolgaltatasok"
        href="/facilities"
      >
        <a>
            További szolgáltatásaink →
        </a>
      </Link>
    </div>
  </section>

export default Facilities