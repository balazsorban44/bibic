import React, {lazy, Suspense, useState} from "react"
import {Link as RouteLink} from "react-router-dom"
import bibic from "assets/icons/bibic.min.png"
import logo from "assets/icons/logo.min.png"
import Fade from "react-reveal/Fade"
import {useTranslation} from "react-i18next"
import withLazy from "components/withLazy"
import {useScrolled, useSize} from "hooks"
import "./menu.sass"
const LanguageSelector =
  () => withLazy(lazy(() => import("components/LanguageSelector")))(undefined, {fallback: null})

const RoomMenu = lazy(() => import("./RoomMenu"))
const Link = lazy(() => import("react-scroll/modules/components/Link"))


const menu = [
  {to:"bemutatkozas", name: "intro"},
  {to:"szolgaltatasok", name: "facilities"},
  {to:"szobak", name: "rooms"},
  {to:"arak", name: "prices"},
  {to:"etelek", name: "foods", component: RouteLink},
  {to:"rendezvenyek", name: "events", component: RouteLink},
  {to:"visszajelzesek", name: "feedbacks"},
  {to:"kapcsolat", name: "contact"}
]


function useMenu() {
  const [menu, setMenu] = useState(false)
  const [roomMenu, setRoomMenu] = useState(false)

  return {
    menuOpen: menu,
    roomMenuOpen: roomMenu,
    hideMenu: () => {
      setMenu(false)
      setRoomMenu(false)
    },
    showRoomMenu: () => setRoomMenu(true),
    toggleMenu: () => setMenu(menu => !menu)
  }
}


export default function Menu() {
  const [t] = useTranslation("common")

  const scrolled = useScrolled({offset: 100})

  const {
    menuOpen, roomMenuOpen,
    hideMenu, showRoomMenu, toggleMenu
  } = useMenu()

  const {width} = useSize()
  const mdUp = width > 768


  return (
    <Fade down>
      <div className={`menu ${scrolled ? "menu-scrolled " : ""}${menuOpen ? "" : "menu-hidden"}`}>
        <Fade right>
          <div
            className={`hamburger ${menuOpen ? "hamburger-clicked" : ""}`}
            onClick={toggleMenu}
            onKeyUp={e => e.key === "Enter" && toggleMenu()}
            role="button"
            tabIndex={0}
          ><span/><span/><span/></div>
        </Fade>
        <div
          className="menu-logo"
          href={process.env.REACT_APP_BASE_URL}
        >
          <h1>
            <picture>
              <source
                media="(min-aspect-ratio: 7/6) and (min-width: 1024px)"
                srcSet={logo}
              />
              <img
                alt={t("title")}
                src={bibic}
              />
            </picture>
          </h1>
        </div>
        {menuOpen || mdUp ?
          <nav>
            <Suspense fallback={null}>
              <ul className="nav-menu">
                {menu.map(({name, to, component: Component=Link, offset=-64}) =>
                  <li key={to}>
                    <Component
                      offset={mdUp ? offset : 0}
                      onClick={hideMenu}
                      onMouseEnter={() => to==="szobak" && showRoomMenu()}
                      role="link"
                      smooth={Component === Link || undefined}
                      tabIndex={0}
                      to={to}
                    >
                      {t(`menu.${name}`)}
                    </Component>
                  </li>
                )}
                <LanguageSelector/>
              </ul>
            </Suspense>
          </nav> : null
        }
        <Suspense fallback={null}>
          <RoomMenu
            mdUp={mdUp}
            onClick={hideMenu}
            open={roomMenuOpen}
          />
        </Suspense>
      </div>
    </Fade>
  )
}