import React, {
  lazy, Suspense, Component
} from 'react'
import {Link as RouteLink, withRouter} from 'react-router-dom'
import {Link} from 'react-scroll'
import bibic from '../assets/icons/bibic.png'
import logo from '../assets/icons/logo.png'
import Fade from "react-reveal/Fade"
import {BASE_URL} from '../utils/constants'

const RoomMenu = lazy(() => import("./RoomMenu"))


export class Menu extends Component {

  state = {
    isMenuOpen: false,
    isScrolled: false,
    isRoomMenuOpen: true,
    menu: [
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
      {to:"visszajelzesek", name: "Visszajelzések"},
      {to:"kapcsolat", name: "Kapcsolat"}
    ]
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
      isMenuOpen, isScrolled, isRoomMenuOpen, width, menu
    } = this.state
    const isBigScreen = width > 768
    return (
      <Fade down>
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
            >
              <ul>
                {menu.map(({
                  name, to, component: Component=Link, offset
                }) =>
                  <li key={to}>
                    <Component
                      offset={isBigScreen ? offset !== undefined ? offset : -64 : 0}
                      onClick={this.handleHideMenu}
                      onMouseEnter={() => to==="szobak" && this.handleShowRoomMenu()}
                      smooth={Component === Link ? true : undefined}
                      to={to}
                    >
                      {name}
                    </Component>
                  </li>
                )}
              </ul>
            </Fade>
          </nav>
          <Suspense fallback={null}>
            <ul className={`room-menu ${isRoomMenuOpen ? "room-menu-show" : ""}`}>
              <RoomMenu
                isBigScreen={isBigScreen}
                onClick={this.handleHideMenu}
              />
            </ul>
          </Suspense>
        </div>
      </Fade>
    )
  }
}

export default Menu


export const BackMenu = withRouter(props => {
  const {location: {search}, history: {goBack}} = props
  const customReturn = new URLSearchParams(search).get("vissza")
  const title = customReturn ||"főoldal"
  return(
    customReturn ?
      <button
        className="back-to-home"
        onClick={goBack}
        title={title}
      >
        <Title {...{title}}/>
      </button> :
      <RouteLink
        className="back-to-home"
        title={title}
        to="/"
      >
        <Title {...{title}}/>
      </RouteLink>
  )
})

const Title = ({title}) =>
  <>
    ←
    <span>
      Vissza ide: {title}
    </span>
  </>