import React, {Component, createContext} from 'react'

import {PARAGRAPHS_REF} from '../../lib/firebase'

const Data = createContext()

export class Store extends Component {

  state = {
    paragraphs: {}
  }

  componentDidMount() {

    // Fetch paragraphs
    PARAGRAPHS_REF
      .on("value", snap => {
          this.setState({paragraphs: snap.val()})
        }
      )
  }

  render() {
    return (
      <Data.Provider value={this.state}>
        {this.props.children}
      </Data.Provider>
    )
  }
}

export default Data