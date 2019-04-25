import React from 'react'
import Gallery from 'components/shared/Gallery'
import Paragraphs from 'components/shared/Paragraphs'
import CERTIFICATES_BG from "assets/images/bg/intro.jpg"
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