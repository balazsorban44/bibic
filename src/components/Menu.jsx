import React, {Component, Fragment} from 'react'
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
    this.setState({isScrolled: window.pageYOffset >= 100})
  }

  handleMenuToggle = () =>
    this.setState(({isMenuOpen}) => ({isMenuOpen: !isMenuOpen}))

  render() {
    const {
      isMenuOpen, isScrolled
    } = this.state
    return (
      <Fragment>
        <div className={`menu-wrapper ${isScrolled ? "header-scrolled" : ""}`}>
          <div
            className={`hamburger ${isMenuOpen ? "hamburger-clicked" : ""}`}
            onClick={this.handleMenuToggle}
          >
            <span/><span/><span/>
          </div>
          <div className="pc-logo">
            <a href="/">
              <img
                alt=""
                src={logo}
              />
            </a>
          </div>
          <nav className={`menu ${isMenuOpen ? "" : "menu-hidden"}`}>
            <ul
              onClick={this.handleMenuToggle}
            >
              <li>
                <Link
                  offset={-64}
                  onClick={this.handleMenuToggle}
                  smooth
                  to="bemutatkozas"
                >
                  Bemutatkozás</Link></li>
              <li>
                <Link
                  offset={-64}
                  onClick={this.handleMenuToggle}
                  smooth
                  to="szolgaltatasok"
                >
                  Szolgáltatások</Link></li>
              <li>
                <Link
                  offset={-64}
                  onClick={this.handleMenuToggle}
                  smooth
                  to="szobak"
                >
              Szobák</Link><span>►</span></li>
              <li>
                <Link
                  offset={-64}
                  onClick={this.handleMenuToggle}
                  smooth
                  to="arak"
                >
              Árak</Link></li>
              <li><RouteLink
                onClick={this.handleMenuToggle}
                to="etelek"
              >
              Ételek</RouteLink></li>
              <li><RouteLink
                onClick={this.handleMenuToggle}
                to="rendezvenyek"
              >              Rendezvények</RouteLink></li>
              {/* <li><RouteLink onClick={this.handleMenuToggle} to="visszajelzesek">Visszajelzések</RouteLink></li> */}
              <li>
                <Link
                  offset={-64}
                  onClick={this.handleMenuToggle}
                  smooth
                  to="kapcsolat"
                >
                  Kapcsolat</Link></li>
            </ul>
          </nav>
          <div className="tablet-header">
            <RouteLink
              className="tablet-reservation"
              offset={-64}
              to="foglalas"
            >Foglalás</RouteLink>
            <div>
              <a href="/">
                <img
                  alt=""
                  src={bibic}
                />
              </a>
            </div>
          </div>
          <ul className={`room-menu ${isMenuOpen ? "" : "room-menu-hidden"}`}>
            <li>
              <Link
                onClick={this.handleMenuToggle}
                to="szoba-1"
              >1</Link></li>
            <li>
              <Link
                onClick={this.handleMenuToggle}
                to="szoba-2"
              >2</Link></li>
            <li>
              <Link
                onClick={this.handleMenuToggle}
                to="szoba-3"
              >3</Link></li>
            <li>
              <Link
                onClick={this.handleMenuToggle}
                to="szoba-4"
              >4</Link></li>
            <li>
              <Link
                onClick={this.handleMenuToggle}
                to="szoba-5"
              >5</Link></li>
            <li>
              <Link
                onClick={this.handleMenuToggle}
                to="szoba-6"
              >6</Link></li>
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
      <li>
        <Link
          smooth
          to="kapcsolat"
        >Kapcsolat</Link></li>
    </ul>
  </nav>