import React, {Suspense, lazy} from "react"
import Fade from "react-reveal/Fade"
import Zoom from "react-reveal/Zoom"
import makeCarousel from "react-reveal/makeCarousel"

import hero1 from "assets/images/hero/1.min.jpg"
import hero2 from "assets/images/hero/2.min.jpg"
import logo from "assets/icons/logo.min.png"
import {useSize} from "hooks"

const Link = lazy(() => import("react-scroll/modules/components/Link"))

const Carousel = makeCarousel(
  ({children}) => <div className="hero-slider">{children}</div>
)

const heroImages = [hero1, hero2]


export default function Hero() {
  const {width} = useSize()

  return (
    <section className="hero">
      <Carousel maxTurns={Infinity}>
        {heroImages.map(src =>
          <Fade key={src}>
            <div className="hero-slide">
              <img
                alt="Hero kép"
                src={src}
              />
            </div>
          </Fade>
        )}
      </Carousel>
      <span className="hero-slider-overlay"/>
      <Zoom>
        <a
          className="hero-logo"
          href="/"
        >
          <img
            alt=""
            src={logo}
          />
        </a>
      </Zoom>
      <Suspense fallback={null}>
        <Link
          className="scroll-icon"
          // TODO: Use ref to nav height
          offset={width >= 768 ? -64 : 0}
          smooth
          to="bemutatkozas"
        />
      </Suspense>
    </section>
  )
}