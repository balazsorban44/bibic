import React, {Component} from 'react'
import {Link as RouteLink} from 'react-router-dom'
import {Link} from 'react-scroll'
import bibic from '../assets/icons/bibic.png'
import logo from '../assets/icons/logo.png'

const w = window.innerWidth

export default class Menu extends Component {
  state = {
    isMenuOpen: false,
    isScrolled: false
  }

  componentDidMount() {
    window.addEventListener("scroll", this.isScrolled, false)
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.isScrolled, false)
  }

  isScrolled = () => {
    this.setState({
      isScrolled: window.pageYOffset >= 100
    })
  }

  toggleMenu = () => 
    this.setState(({isMenuOpen}) => ({isMenuOpen: !isMenuOpen}))
  
  getOffset = () => w >= 768 ? -64 : 0

  isSmooth = () => w >= 1280

  render() {
    const {isMenuOpen, isScrolled} = this.state
    return (
      <div className={`menu-wrapper ${isScrolled ? "header-scrolled" : ""}`}>
        <div 
          onClick={this.toggleMenu}
          className={`hamburger ${isMenuOpen ? "hamburger-clicked" : ""}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="pc-logo">
          <a href="/">
            <img alt="" src={logo}/>
          </a>
        </div>
        <nav onClick={this.toggleMenu} className={`menu ${isMenuOpen ? "" : "menu-hidden"}`}>
          <ul>
            <li><Link hashSpy onClick={this.toggleMenu} smooth={this.isSmooth()} offset={this.getOffset()} to="bemutatkozas">Bemutatkozás</Link></li>
            <li><Link hashSpy onClick={this.toggleMenu} smooth={this.isSmooth()} offset={this.getOffset()} to="szolgaltatasok">Szolgáltatások</Link></li>
            <li><Link hashSpy onClick={this.toggleMenu} smooth={this.isSmooth()} offset={this.getOffset()} to="szobak">Szobák</Link><span>►</span></li>
            <li><Link hashSpy onClick={this.toggleMenu} smooth={this.isSmooth()} offset={this.getOffset()} to="arak">Árak</Link></li>
            <li><Link hashSpy onClick={this.toggleMenu} smooth={this.isSmooth()} offset={this.getOffset()} to="etelek">Ételek</Link></li>
            <li><Link hashSpy onClick={this.toggleMenu} smooth={this.isSmooth()} offset={this.getOffset()} to="rendezvenyek">Rendezvények</Link></li>
            <li><Link hashSpy onClick={this.toggleMenu} smooth={this.isSmooth()} offset={this.getOffset()} to="kapcsolat">Kapcsolat</Link></li>
          </ul>
        </nav>
        <div className="tablet-header">
          <div>
            <a href="/">
              <img alt="" src={bibic}/>
            </a>
          </div>
          <RouteLink className="tablet-reservation" offset={-64} to="foglalas">Foglalás</RouteLink>
        </div>
        <ul onClick={this.toggleMenu} className={`room-menu ${isMenuOpen ? "" : "room-menu-hidden"}`}>
          <li><Link hashSpy onClick={this.toggleMenu} offset={this.getOffset()} to="szoba-1">1</Link></li>
          <li><Link hashSpy onClick={this.toggleMenu} offset={this.getOffset()} to="szoba-2">2</Link></li>
          <li><Link hashSpy onClick={this.toggleMenu} offset={this.getOffset()} to="szoba-3">3</Link></li>
          <li><Link hashSpy onClick={this.toggleMenu} offset={this.getOffset()} to="szoba-4">4</Link></li>
          <li><Link hashSpy onClick={this.toggleMenu} offset={this.getOffset()} to="szoba-5">5</Link></li>
          <li><Link hashSpy onClick={this.toggleMenu} offset={this.getOffset()} to="szoba-6">6</Link></li>
        </ul>
      </div>
    )
  }
}