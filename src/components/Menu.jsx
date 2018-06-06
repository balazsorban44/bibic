import React, {Component, Fragment} from 'react'
import {Route} from 'react-router-dom'
import {Link as RouteLink} from 'react-router-dom'
import {Link} from 'react-scroll'
import bibic from '../assets/icons/bibic.png'
import logo from '../assets/icons/logo.png'

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
  
  render() {
    const {isMenuOpen, isScrolled} = this.state
    return (
      <Fragment>
          <div className={`menu-wrapper ${isScrolled ? "header-scrolled" : ""}`}>
          <div onClick={this.toggleMenu} className={`hamburger ${isMenuOpen ? "hamburger-clicked" : ""}`}>
            <span/><span/><span/>
          </div>
          <div className="pc-logo">
            <a href="/">
              <img alt="" src={logo}/>
            </a>
          </div>
          <nav className={`menu ${isMenuOpen ? "" : "menu-hidden"}`}>
            <ul
              onClick={this.toggleMenu} 
            >
              <li><Link onClick={this.toggleMenu} offset={-64} smooth to="bemutatkozas">Bemutatkozás</Link></li>
              <li><Link onClick={this.toggleMenu} offset={-64} smooth to="szolgaltatasok">Szolgáltatások</Link></li>
              <li><Link onClick={this.toggleMenu} offset={-64} smooth to="szobak">Szobák</Link><span>►</span></li>
              <li><Link onClick={this.toggleMenu} offset={-64} smooth to="arak">Árak</Link></li>
              <li><RouteLink onClick={this.toggleMenu} to="etelek">Ételek</RouteLink></li>
              <li><RouteLink onClick={this.toggleMenu} to="rendezvenyek">Rendezvények</RouteLink></li>
              <li><RouteLink onClick={this.toggleMenu} to="visszajelzesek">Visszajelzések</RouteLink></li>
              <li><Link onClick={this.toggleMenu} offset={-64} smooth to="kapcsolat">Kapcsolat</Link></li>
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
          <ul className={`room-menu ${isMenuOpen ? "" : "room-menu-hidden"}`}>
            <li><Link onClick={this.toggleMenu}  to="szoba-1">1</Link></li>
            <li><Link onClick={this.toggleMenu}  to="szoba-2">2</Link></li>
            <li><Link onClick={this.toggleMenu}  to="szoba-3">3</Link></li>
            <li><Link onClick={this.toggleMenu}  to="szoba-4">4</Link></li>
            <li><Link onClick={this.toggleMenu}  to="szoba-5">5</Link></li>
            <li><Link onClick={this.toggleMenu}  to="szoba-6">6</Link></li>
          </ul>
        </div>
      </Fragment>
     
    )
  }
}

export const BackMenu = () =>
  <nav className="back-menu">
    <ul>
      <li>
        <RouteLink to="/">← Vissza a főoldalra</RouteLink>
      </li>
      <li><Link smooth to="kapcsolat">Kapcsolat</Link></li>
    </ul>
  </nav>