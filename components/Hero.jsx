import * as React from 'react'

const Hero = () => {
  return (
    <section className="hero">
      <img
        alt="Hero kép"
        //   TODO: Add alt text
        className="hero-img"
        src={`images/hero/2.jpg`}
      />
      <a className="hero-logo" href="/">
        <img
          //   TODO: Add alt text
          alt=""
          src="/mstile-150x150.png"
        />
      </a>
      <a
        className="scroll-icon"
        href="#bemutatkozas"
        title="Go to next section"
        // TODO: check a11y
      ><span aria-label="Go to next section"/></a>
    </section>
  )
}


export default Hero