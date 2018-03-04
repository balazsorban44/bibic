import React, {Component} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Menu from './Menu'
export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        {/* <Menu/> */}
        <Main/>
        <Footer/>
      </div>
    )
  }
}

