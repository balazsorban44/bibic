import React, {Component} from 'react'
import logo from '../assets/icons/logo.png'
import {Link} from 'react-scroll'
import {Loading} from './shared/Elements'
import {withStore} from './db'
import Fade from "react-reveal/Fade"
import Zoom from "react-reveal/Zoom"
import makeCarousel from 'react-reveal/makeCarousel'


export const CarouselUI = ({children}) => <div className="hero-slider">{children}</div>
const Carousel = makeCarousel(CarouselUI)


export class Hero extends Component {

  state = {isBigScreen: false}

  async componentDidMount() {
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
    const {hero} = this.props
    return (
      <section className="hero">
        {hero.length ?
          <Carousel maxTurns={Infinity}>
            {hero.map(src =>
              <Fade key={src}>
                <div className="hero-slide">
                  <img
                    alt="Hero kép"
                    src={src}
                  />
                </div>
              </Fade>
            )}
          </Carousel> :
          <Loading fullPage/>
        }
        <span className="hero-slider-overlay"/>
        <Zoom
          when={hero.length}
        >
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


export default withStore(Hero)

