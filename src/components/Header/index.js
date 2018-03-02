import React, {Component} from 'react'
import hero from '../../media/images/hero/1.jpg'
import bibic from '../../media/images/hero/bibic.svg'
import {Link} from 'react-scroll'

export default class Header extends Component {
  render() {
    return (
      <header>
        <div id="hero">
          <img id="hero-img" src={hero} alt="Hero kép"/>
          <img className="hero-logo" src={bibic} alt="Bíbic logó"/>
          <Link smooth to="bemutatkozas" className="scroll-icon"/>
        </div>
        <div className="hamburger"><span/></div>
        <nav>
          <ul 
          // className="hidden"
           id="menu">
            <li><Link offset={-64} smooth to="bemutatkozas">Bemutatkozás</Link></li>
            <li><Link offset={-64} smooth to="szolgaltatasok">Szolgáltatások</Link></li>
            <li><Link offset={-64} smooth to="szobak">Szobák</Link></li>
            <li><Link offset={-64} smooth to="specialitasok">Specialitások</Link></li>
            <li><Link offset={-64} smooth to="arak">Árak</Link></li>
            <li><Link offset={-64} smooth to="galeria">Galéria</Link></li>
            <li><Link offset={-64} smooth to="kapcsolat">Kapcsolat</Link></li>
          </ul>
          <ul id="szoba-lista">
            <Link offset={-64} smooth to="szoba-1">1</Link>
            <Link offset={-64} smooth to="szoba-2">2</Link>
            <Link offset={-64} smooth to="szoba-3">3</Link>
            <Link offset={-64} smooth to="szoba-4">4</Link>
            <Link offset={-64} smooth to="szoba-5">5</Link>
            <Link offset={-64} smooth to="szoba-6">6</Link>
          </ul>
        </nav>
      </header>
    )
  }
}