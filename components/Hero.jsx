import React from 'react'
import {useRouter} from "next/router"

const Hero = () => {

  const router = useRouter()
  //   const handleScrollClick = (e) => {
  //     const el = document.querySelector("#bemutatkozas")
  //     el?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start"
  //     })
  //   }

  return (
    <section className="hero">
      {[1,2].map(id =>
        <div className="hero-slide" key={id}>
          <img
            //   TODO: Add alt text
            alt="Hero kép"
            src={`images/hero/${id}.jpg`}
          />
        </div>
      )}
      <span className="hero-slider-overlay"/>
      <a
        className="hero-logo"
        href="/"
      >
        <img
          //   TODO: Add alt text
          alt=""
          src="/icons/logo.png"
        />
      </a>
      <a
        className="scroll-icon"
        href="#bemutatkozas"
        // onClick={handleScrollClick}
      />
    </section>
  )
}


export default Hero