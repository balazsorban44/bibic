import React, {Component} from 'react'
import logo from '../assets/icons/logo.png'
import {Link} from 'react-scroll'
import {Loading} from './shared/Elements'

export default class Header extends Component {

  state = {isBigScreen: false, images: []}

  async componentDidMount() {
    const images = await Promise.all([
      import("../assets/images/hero/1.jpg"),
      import("../assets/images/hero/2.jpg")
    ])
    this.setState({images: images.map(({default: img}) => img)})
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
    const {images, isBigScreen} = this.state
    return (
      <section className="hero">
        {images.length ?
          <Carousel
            images={images}
            isBigScreen={isBigScreen}
          /> :
          <Loading fullPage/>
        }
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


class Carousel extends Component {

  static defaultProps = {
    interval: 5000, transition: 1000, images: []
  }

  state = {active: 0, isBigScreen: false}

  componentDidMount(){
    this.handleResize()
    window.addEventListener("resize", this.handleResize, false)
    setInterval(this.update, this.props.interval)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false)
    clearInterval(this.update, this.props.interval)
  }


  handleResize = () => this.setState({isBigScreen: window.innerWidth > 768})


  update = () =>
    this.setState(({active}) => ({active: active+1 < this.props.images.length ? active+1 : 0}))

  render() {
    const {images, transition} = this.props
    const {active} = this.state
    return(
      <div className="hero-slider">
        {images.map((src, index) =>
          <div
            className={`hero-slide ${active === index ? "hero-slide-active" : ""}`}
            key={src}
            style={{transition: `${transition/1000}s opacity`,
              backgroundImage: `url(${src})`}}
          />
        )}
      </div>
    )
  }
}