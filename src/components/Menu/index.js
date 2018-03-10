import React, {Component} from 'react'
import {Link} from 'react-scroll'


export default class Menu extends Component {
  render() {
    return (
      <header>
        <nav className="hidden">
          <ul className="hidden" id="menu">
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