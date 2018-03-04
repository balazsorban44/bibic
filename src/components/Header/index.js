import React, {Component} from 'react'
import hero from '../../media/images/hero/1.jpg'
import ScrollTo from '../shared/ScrollTo'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

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
  
  render() {
    return (
      <section className="hero">
        <img className="hero-bg" src={hero} alt="Hero háttérkép"/>
        {/* {this.renderHeroSlider()} */}
        <ScrollTo to="bemutatkozas"/>
      </section>
    )
  }
}