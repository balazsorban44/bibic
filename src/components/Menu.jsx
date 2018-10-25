import React, {Component} from 'react'
import {Link as RouteLink} from 'react-router-dom'
import {Link} from 'react-scroll'
import bibic from '../assets/icons/bibic.png'
import logo from '../assets/icons/logo.png'
import {withStore} from './db'
import Fade from "react-reveal/Fade"
import {BASE_URL} from '../utils/constants'

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

  state = {
    isMenuOpen: false,
    isScrolled: false,
    isRoomMenuOpen: true
  }

  componentDidMount() {
    window.addEventListener("scroll", this.isScrolled, false)
    window.addEventListener("resize", this.isResized, false)
    this.isScrolled()
    this.isResized()
    if (window.innerWidth > 768) this.setState({isRoomMenuOpen: false})
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.isScrolled, false)
    window.removeEventListener("resize", this.isResized, false)
  }

  isScrolled = () => this.setState({isScrolled: window.pageYOffset >= 100})

  isResized = () => this.setState({width: window.innerWidth})

  handleShowRoomMenu = () => this.setState({isRoomMenuOpen: true})

  handleHideRoomMenu = () => this.setState({isRoomMenuOpen: false})

  handleMenuToggle = () => this.setState(({isMenuOpen}) => ({isMenuOpen: !isMenuOpen}))


  handleHideMenu = () => this.setState({isMenuOpen: false, isRoomMenuOpen: false})

  render() {
    const {
      isMenuOpen, isScrolled, isRoomMenuOpen, width
    } = this.state
    const isBigScreen = width > 768
    const {hero, rooms} = this.props
    return (
      <Fade
        down
        when={hero.length}
      >
        <div
          className={`menu ${isScrolled ? "menu-scrolled" : ""} ${isMenuOpen ? "" : "menu-hidden"}`}
        >
          <Fade right>
            <div
              className={`hamburger ${isMenuOpen ? "hamburger-clicked" : ""}`}
              onClick={this.handleMenuToggle}
            ><span/><span/><span/></div>
          </Fade>
          <a
            className={`menu-logo ${isScrolled ? "menu-logo-scrolled" : ""}`}
            href={BASE_URL}
          >
            <picture>
              <source
                media="(min-aspect-ratio: 7/6) and (min-width: 1024px)"
                srcSet={logo}
              />
              <img
                alt="logo"
                src={bibic}
              />
            </picture>
          </a>
          <nav>
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
                      offset={isBigScreen ? offset!==undefined ? offset : -64 : 0}
                      onClick={this.handleHideMenu}
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
          <ul className={`room-menu ${isRoomMenuOpen ? "room-menu-show" : ""}`}>
            {rooms.map(({id}) =>
              <li
                key={id}
              >
                <Link
                  offset={isBigScreen ? -106 : -40}
                  onClick={this.handleHideMenu}
                  to={`szoba-${id}`}
                >
                  {id}
                </Link>
              </li>
            )}
          </ul>
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