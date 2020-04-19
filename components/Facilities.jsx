import * as React from 'react'
import Gallery from 'components/Gallery'
import Link from "next/link"

const Facilities = ({images}) =>
  <>
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
  </>

export default Facilities