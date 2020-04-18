import React from 'react'
import {Gallery} from './Gallery'

const Sunflower = ({paragraphs, images}) =>
  <section id="napraforgo">
    {paragraphs.map(({text}, index) =>
      <p key={index}>{text}</p>
    )}
    <Gallery images={images}/>
    <div className="cert-bg">
      <img
        aria-hidden
        src="/images/bg/intro.jpg"
      />
    </div>
  </section>

export default Sunflower