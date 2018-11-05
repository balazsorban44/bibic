import React, {Component} from "react"
import {Loading} from "./shared/Elements"
import {sendNotification} from "./db/notification"

export default importComponent =>
  class extends Component {
    state = {C: null}

    async componentDidMount() {
      try {
        const {default: C} = await importComponent()
        this.setState({C})
      } catch (error) {
        sendNotification(error.message)
      }
    }

    render() {
      const {C} = this.state
      return C ? <C {...this.props}/> : <Loading fullPage/>
    }
  }
