import React, {Component, createContext, useContext} from 'react'

import {withNotification} from 'lib/notification'
import {ROOMS_REF, FEEDBACKS_FS_REF, FEEDBACKS_REF} from "lib/firebase"
import {initialState} from './initialState'
import {subscribeToFeedbacks} from './feedback'
import {fetchData, subscribeToDatabase} from './fetch'

const Store = createContext()

export const useStore = () => useContext(Store)


export class Database extends Component {

  state = initialState

  // Fetch all initial data
  componentDidMount = async () => {
    try {

      subscribeToDatabase(FEEDBACKS_REF,
        rooms => this.setState(({feedbacks}) => ({feedbacks: {...feedbacks, rooms}}))
      )

      subscribeToFeedbacks(FEEDBACKS_FS_REF,
        all => this.setState(({feedbacks: prev}) => ({feedbacks: {...prev, all}}))
      )

      const rooms = await fetchData(ROOMS_REF)
      this.setState({rooms})

    } catch (error) {
      this.props.notify({type: "error", content: error.message})
    }

  }


  render() {
    return (
      <Store.Provider value={this.state}>
        {this.props.children}
      </Store.Provider>
    )
  }
}


export default withNotification(Database)