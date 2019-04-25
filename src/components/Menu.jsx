import React, {lazy, Suspense, Component} from 'react'
import {Link as RouteLink} from 'react-router-dom'
import {withRouter} from "react-router"
import bibic from 'assets/icons/bibic.min.png'
import logo from 'assets/icons/logo.min.png'
import Fade from "react-reveal/Fade"
import { withTranslation, useTranslation } from 'react-i18next';
import withLazy from 'components/shared/withLazy';

const LanguageSelector = 
  () => withLazy(lazy(() => import('./LanguageSelector')))(undefined, {fallback: null})

const RoomMenu = lazy(() => import("./RoomMenu"))

const menu = [
  {to:"bemutatkozas", name: "intro"},
  {to:"szolgaltatasok", name: "services"},
  {to:"szobak", name: "rooms"},
  {to:"arak", name: "prices"},
  {
    to:"etelek", name: "foods", component: RouteLink
  },
  {
    to:"rendezvenyek", name: "events", component: RouteLink
  },
  {to:"visszajelzesek", name: "feedbacks"},
  {to:"kapcsolat", name: "contact"}
]

export class Menu extends Component {

  state = {
    isMenuOpen: false,
    isScrolled: false,
    isRoomMenuOpen: true,
    Link: null
  }

  async componentDidMount() {
    window.addEventListener("scroll", this.isScrolled, false)
    window.addEventListener("resize", this.isResized, false)
    this.isScrolled()
    this.isResized()
    if (window.innerWidth > 768) this.setState({isRoomMenuOpen: false})
    const {Link} = await import("react-scroll")
    this.setState({Link})
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
      isMenuOpen, isScrolled, isRoomMenuOpen, width, Link
    } = this.state
    const {t} = this.props
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
            href={process.env.REACT_APP_BASE_URL}
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
              <ul className="nav-menu">
                {Link && menu.map(({
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
                      {t(`menu.${name}`)}
                    </Component>
                  </li>
                )}
                  <LanguageSelector/>
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

export default withTranslation("common")(Menu)


export const BackButton = withRouter(props => {
  const [t] = useTranslation("common")
  const {location: {search}, history: {goBack}} = props
  const customReturn = new URLSearchParams(search).get("vissza")
  const title = t(customReturn || "homepage")
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

const Title = ({title}) => {
  const [t] = useTranslation("common")
  return (
    <>
      ←
      <span>
        {t("back-to")} {t(title)}
      </span>
    </>
  )
}