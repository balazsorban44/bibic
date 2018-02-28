import React from 'react'


const Gallery = () => (
  <section id="galeria">
    <h2>Galéria</h2>
    <div className="js_simple" id="gallery">
      <div className="frame js_frame">
        <ul className="slides js_slides">
          <li className="js_slide">

          {/* SLIDER */}
          </li>

        </ul>
      </div>
      <span className="js_prev prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5">
          <g>
            <path fill="#FFF" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z">
            </path>
          </g>
        </svg>
        </span>
        <span className="js_next next">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5">
          <g>
            <path fill="#FFF" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z">
            </path>
          </g>
        </svg>
        </span>
    </div>
  </section>
)


export default Gallery