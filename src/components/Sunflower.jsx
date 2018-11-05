import React from 'react'
import Paragraphs from './shared/Paragraphs'
import Gallery from './shared/Gallery'
import CERTIFICATES_BG from "../assets/images/bg/intro.jpg"
const Sunflower = () =>
  <section id="napraforgo">
    <Paragraphs path="tanusitvanyok"/>
    <Gallery path="tanusitvanyok"/>
    <div className="cert-bg">
      <img
        alt="certificates background"
        src={CERTIFICATES_BG}
      />
    </div>
  </section>


export default Sunflower