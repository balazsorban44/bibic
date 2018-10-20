import React, {Component} from 'react'
import {Link as RouteLink} from 'react-router-dom'
import {Link} from 'react-scroll'
import bibic from '../assets/icons/bibic.png'
import logo from '../assets/icons/logo.png'
import {withStore} from './db'
import Fade from "react-reveal/Fade"

const menu = [
  {to:"bemutatkozas", name: "Bemutatkozás"},
  {to:"szolgaltatasok", name: "Szolgáltatások"},
  {to:"szobak", name: "Szobák"},
  {to:"arak", name: "Árak"},
  {
    to:"etelek", name: "Ételek", component: RouteLink
  },
  {
    to:"rendezvenyek", name: "Rendezvények", component: RouteLink
  },
  //{to:"visszajelzesek", name: "Visszajelzések", component: RouteLink},
  {to:"kapcsolat", name: "Kapcsolat"}
]

class Menu extends Component {
  state = {isMenuOpen: false,
    isScrolled: false}

  componentDidMount() {
    window.addEventListener("scroll", this.isScrolled, false)
  }


  componentWillUnmount() {
    window.removeEventListener("scroll", this.isScrolled, false)
  }


  isScrolled = () => this.setState({isScrolled: window.pageYOffset >= 100})

  handleHideRoomMenu = () => this.setState({isMenuOpen: false})

  handleShowRoomMenu = () => this.setState({isMenuOpen: true})

  handleMenuToggle = () =>
    this.setState(({isMenuOpen}) => ({isMenuOpen: !isMenuOpen}))

  render() {
    const {isMenuOpen, isScrolled} = this.state
    const {
      className, hero, rooms
    } = this.props
    return (
      <Fade
        down
        when={hero.length}
      >
        <div
          className={`${className} menu-wrapper ${isScrolled ? "header-scrolled" : ""}`}
        >
          <Fade right>
            <div
              className={`hamburger ${isMenuOpen ? "hamburger-clicked" : ""}`}
              onClick={this.handleMenuToggle}
            >
              <span/><span/><span/>
            </div>
          </Fade>
          <div className="pc-logo">
            <a href="/">
              <img
                alt=""
                src={logo}
              />
            </a>
          </div>
          <nav className={`menu ${isMenuOpen ? "" : "menu-hidden"}`}>
            <Fade
              cascade
              down
              when={hero.length}
            >
              <ul>
                {menu.map(({
                  name, to, component: Component=Link, offset
                }) =>
                  <li key={to}>
                    <Component
                      offset={offset!==undefined ? offset : -64}
                      onClick={this.handleHideRoomMenu}
                      onMouseEnter={() => to==="szobak" && this.handleShowRoomMenu()}
                      smooth={Component===Link ? true : undefined}
                      to={to}
                    >
                      {name}
                    </Component>
                  </li>
                )}
              </ul>
            </Fade>
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
          <Fade
            down
            duration={300}
            when={isMenuOpen}
          >
            <ul className="room-menu">
              {rooms.map(({id}) =>
                <li key={id}>
                  <Link
                    offset={-106}
                    onClick={this.handleHideRoomMenu}
                    to={`szoba-${id}`}
                  >{id}</Link></li>
              )}
            </ul>
          </Fade>
        </div>
      </Fade>
    )
  }
}

export default withStore(Menu)

export const BackMenu = () =>
  /**
   * REVIEW: Not working with react-reveal
   * <Fade up>
   */
  <RouteLink
    className="back-to-home"
    to="/"
  >
      ← Vissza a főoldalra
  </RouteLink>
  // </Fade>