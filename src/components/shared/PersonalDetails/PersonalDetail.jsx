import React, {Component} from 'react'
import {valid} from '../../../utils/validate'
import {sendNotification} from '../../db/notification'

export default class PersonalDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {value: props.value, error: false}
  }


  componentDidUpdate() {
    const {value} = this.props
    if (this.state.value === "" && value !== "") this.setState({value})
  }

  handleChange = ({target: {value}}) => this.setState({value})

  handleBlur = ({target: {name, value}}) => {
    let error = false

    if (valid[name](value)) {
      this.props.onChange(name, value)
    } else {
      this.props.onChange(name, "")
      error = true
    }

    this.setState({error})
    // REVIEW: do not fire notification, if the user did not fill in any info, or the info was corrected

    if (error && value !== "") {
      sendNotification("error", this.props.errorMessage)
    }
  }

  render() {
    const {value, error} = this.state
    const {
      type, label, name, placeholder, hasFootnote, disabled
    } = this.props
    return (
      <div className={`input-box personal-detail ${error ? "input-error" : ""}`}>
        <label
          className={hasFootnote ? "footnote-asterix" : ""}
          htmlFor={name}
        >{label}</label>
        <input
          {...{
            name,
            value,
            disabled
          }}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          placeholder={label || placeholder}
          type={type || "text"}
        />
      </div>
    )
  }
}
