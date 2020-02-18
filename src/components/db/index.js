import React, {Component, createContext, useContext} from 'react'
import {withRouter} from 'react-router-dom'

import {withNotification} from 'lib/notification'

import {initialState} from './initialState'
import {subscribeToFeedbacks} from './feedback'
import {fetchData, subscribeToDatabase} from './fetch'

const Store = createContext()

export const withStore = Component => props => {
  return (
    <Store.Consumer>
      {storeProps => <Component {...props} {...storeProps}/>}
    </Store.Consumer>
  )
}


export const useStore = () => useContext(Store)

export class Database extends Component {

  state = initialState

  // Fetch all initial data
  componentDidMount = async () => {
    try {
      const {
        ROOMS_REF,
        ROOM_SERVICES_REF,
        FEEDBACKS_FS_REF, FEEDBACKS_REF
      } = await import("lib/firebase")


      subscribeToDatabase(ROOM_SERVICES_REF, services => this.setState({roomServices: Object.entries(services)}))

      subscribeToDatabase(FEEDBACKS_REF,
        rooms => this.setState(({feedbacks}) => ({feedbacks: {...feedbacks, rooms}})))

      subscribeToFeedbacks(FEEDBACKS_FS_REF,
        all => this.setState(({feedbacks: prev}) => ({feedbacks: {...prev, all}})))

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


export default withRouter(withNotification(Database))