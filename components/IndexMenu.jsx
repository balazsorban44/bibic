import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Link from "next/link"


const menu = [
  {href: "#bemutatkozas", name: "Bemutatkozás"},
  {href: "#szolgaltatasok", name: "Szolgáltatások"},
  {href: "#szobak", name: "Szobák"},
  {href: "#arak", name: "Árak"},
  {href: "/menu", as: "/etelek", name: "Ételek"},
  {href: "/events", as: "/rendezvenyek", name: "Rendezvények"},
  {href: "/feedbacks", as: "/visszajelzesek", name: "Visszajelzések"},
  {href: "#kapcsolat", name: "Kapcsolat"}
]

const IndexMenu = ({rooms}) => {

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [roomMenuOpen, setRoomMenuOpen] = useState(true)

  useEffect(() => {
    setRoomMenuOpen(window.innerWidth <= 768)
    setScrolled(window.pageYOffset >= 100)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.pageYOffset >= 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleShowRoomMenu = () => setRoomMenuOpen(true)

  const handleMenuToggle = () => setMenuOpen(menuOpen => !menuOpen)

  const handleHideMenu = () => {
    setMenuOpen(false)
    setRoomMenuOpen(false)
  }

  return (
    <div
      className={`menu ${scrolled ? "menu-scrolled" : ""} ${menuOpen ? "" : "menu-hidden"}`}
    >
      <div
        className={`hamburger ${menuOpen ? "hamburger-clicked" : ""}`}
        onClick={handleMenuToggle}
      ><span/><span/><span/></div>
      <a
        className="menu-logo"
        href={process.env.BASE_URL}
      >
        <picture>
          <source
            media="(min-aspect-ratio: 7/6) and (min-width: 1024px)"
            srcSet="/icons/logo.png"
          />
          <img
            alt="logo"
            src="/icons/bibic.png"
          />
        </picture>
      </a>
      <nav>
        <ul>
          <li>
            <a href="https://bibicvendeghazak.blog">
              Blog
            </a>
          </li>
          {menu.map(({name, href, as}) =>
            <li key={name}>
              {as ? (
                <Link as={as} href={href}>
                  <a>{name}</a>
                </Link>
              ) : (
                <a
                  href={href}
                  onClick={handleHideMenu}
                  onMouseEnter={() => href.includes("szobak") && handleShowRoomMenu()}
                >
                  {name}
                </a>
              )}
            </li>
          )}
        </ul>
      </nav>
      <ul className={`room-menu ${roomMenuOpen ? "room-menu-show" : ""}`}>
        {rooms.map(({id}) =>
          <li key={id} onClick={handleHideMenu}>
            <Link href={`#szoba-${id}`}>
              <a>
                {id}
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default IndexMenu


export const BackMenu = () => {
  const router = useRouter()
  const title = router.query.vissza || "főoldal"
  return(
    customReturn ?
      <button
        className="back-to-home"
        onClick={() => router.back()}
        title={title}
      >
        <Title {...{title}}/>
      </button> :
      <Link
        href="/"
      >
        <a className="back-to-home" title={title}>
          ← <span>Vissza ide: {title}</span>
        </a>
      </Link>
  )
}