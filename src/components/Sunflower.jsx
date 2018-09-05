import React from 'react'
import Paragraphs from './shared/Paragraphs'
import Gallery from './shared/Gallery'

const Sunflower = () =>
  <section id="napraforgo">
    <Paragraphs path="tanusitvanyok"/>
    <div className="certificates">
      <Gallery path="tanusitvanyok"/>
    </div>
  </section>


export default Sunflower