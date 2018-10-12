import React, {Component} from "react"
import {Loading} from "./shared/Elements"

export default importComponent =>
  class extends Component {
    state = {C: null}

    async componentDidMount() {
      const {default: C} = await importComponent()
      this.setState({C})
    }

    render() {
      const {C} = this.state
      return C ? <C {...this.props}/> : <Loading fullPage/>
    }
  }