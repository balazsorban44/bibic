import React, {Component} from 'react'
import Fade from "react-reveal/Fade"
import Zoom from "react-reveal/Zoom"
import makeCarousel from 'react-reveal/makeCarousel'

import hero1 from "assets/images/hero/1.min.jpg"
import hero2 from "assets/images/hero/2.min.jpg"
import logo from 'assets/icons/logo.min.png'


export const CarouselUI = ({children}) => <div className="hero-slider">{children}</div>
const Carousel = makeCarousel(CarouselUI)

export class Hero extends Component {

  state = {isBigScreen: false, Link: null}

  async componentDidMount() {
    this.handleResize()
    window.addEventListener("resize", this.handleResize, false)
    const {Link} = await import("react-scroll")
    this.setState({Link})
  }


  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false)
  }


  handleResize = () => {
    this.setState({isBigScreen: window.innerWidth > 768})
  }

  getOffset = () => window.innerWidth >= 768 ? -64 : 0


  render() {
    const {Link} = this.state
    return (
      <section className="hero">
        <Carousel maxTurns={Infinity}>
          {[hero1, hero2].map(src =>
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
        {Link &&
          <Link
            className="scroll-icon"
            offset={this.getOffset()}
            smooth
            to="bemutatkozas"
          />
        }
      </section>
    )
  }
}


export default Hero

