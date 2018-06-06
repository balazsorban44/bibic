import React, {Component} from 'react'
import hero from '../assets/images/hero/1.jpg'
import logo from '../assets/icons/logo.png'
import {Link} from 'react-scroll'

import Slider from 'react-slick'
export default class Header extends Component {

  state = {
    isBigScreen: false
  }

  handleResize = () => {
    this.setState({
      isBigScreen: window.innerWidth > 768
    })
  }

  renderHeroSlider = () => (
    this.state.isBigScreen ?
    <Slider
      className="hero-slider"
      autoplay autoplaySpeed={4500}
      accessibility={false}
      arrows={false}
      
    >
      <img className="hero-slide" src={hero} alt="Hero háttérkép"/>
      <img className="hero-slide" src={hero} alt="Hero háttérkép"/>
      <img className="hero-slide" src={hero} alt="Hero háttérkép"/>
    </Slider>: 
    <img className="hero-bg" src={hero} alt="Hero háttérkép"/>
  )
  
  componentDidMount() {
    this.handleResize()
    window.addEventListener("resize", this.handleResize, false)
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false)
  }

  getOffset = () => window.innerWidth >= 768 ? -64 : 0

  
  render() {
    return (
      <section className="hero"> 
        <img className="hero-bg" src={hero} alt="Hero háttérkép"/>
        <span className="hero-bg-overlay"/>
        <a href="/">
          <img className="hero-logo" src={logo} alt=""/>
        </a>
        {/* {this.renderHeroSlider()} */}
        <Link offset={this.getOffset()} to="bemutatkozas" className="scroll-icon" smooth/>
      </section>
    )
  }
}