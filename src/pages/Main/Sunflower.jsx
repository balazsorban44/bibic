import React from 'react'
import Paragraphs from 'components/Paragraphs'
import Gallery from 'components/Gallery'
import CERTIFICATES_BG from "assets/images/bg/intro.jpg"

const Sunflower = () =>
  <section id="napraforgo">
    <Paragraphs section="certificates"/>
    <Gallery section="certificates"/>
    <div className="cert-bg">
      <img
        alt="certificates background"
        src={CERTIFICATES_BG}
      />
    </div>
  </section>


export default Sunflower