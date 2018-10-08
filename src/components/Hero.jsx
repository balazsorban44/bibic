import React, {Component} from 'react'
import hero1 from '../assets/images/hero/2.jpg'
import hero2 from '../assets/images/hero/1.jpg'
import logo from '../assets/icons/logo.png'
import {Link} from 'react-scroll'
import Carousel from "nuka-carousel"

export default class Header extends Component {

  state = {isBigScreen: false}

  componentDidMount() {
    this.handleResize()
    window.addEventListener("resize", this.handleResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false)
  }


  handleResize = () => {
    this.setState({isBigScreen: window.innerWidth > 768})
  }

  getOffset = () => window.innerWidth >= 768 ? -64 : 0

  render() {
    return (
      <section className="hero">
        <Carousel
          autoplay
          autoplayInterval={7500}
          className="hero-slider"
          dragging={false}
          heightMode="max"
          speed={750}
          transitionMode="fade"
          withoutControls
          wrapAround
        >
          <img
            alt="Hero háttérkép"
            className="hero-slide"
            src={hero1}
          />
          <img
            alt="Hero háttérkép"
            className="hero-slide"
            src={hero2}
          />
        </Carousel>
        <span className="hero-slider-overlay"/>
        <a
          className="hero-logo"
          href="/"
        >
          <img
            alt=""
            src={logo}
          />
        </a>

        <Link
          className="scroll-icon"
          offset={this.getOffset()}
          smooth
          to="bemutatkozas"
        />
      </section>
    )
  }
}