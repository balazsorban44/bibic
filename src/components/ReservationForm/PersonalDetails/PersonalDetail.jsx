import React, {Component} from 'react'
import {valid} from '../../../utils/validate'

export default class PersonalDetail extends Component {

  state = {
    type: null,
    placeholder: "",
    label: "",
    name: "",
    value: "",
    hasFootnote: false,
    error: false,
    errorMessage: ""
  }

  componentDidMount() {
    const {
      error, ...rest
    } = this.props
    this.setState({...rest})
  }

  handleChange = ({target: {
    name, value
  }}) => {
    this.setState({
      name,
      value
    })
  }

  handleBlur = ({target: {
    name, value
  }}) => {
    let error = false

    if (valid[name](value)) {
      this.props.onChange(name, value)
    } else {
      this.props.onChange(name, "")
      error = true
    }

    this.setState({error})
    // do not fire notification, if the user did not fill in any info, or the info was corrected
    if (error && value !== "") {
      this.props.notification(
        <p>
          {this.state.errorMessage}<br/>
          Kérjük próbálja újra.
          Ha úgy gondolja hiba történt, kérjük írjon:<br/>
          <a href="mailto:hiba@bibicvedeghazak.hu">hiba@bibicvedeghazak.hu</a>
        </p>, {autoClose: 5000}
      )
    }
  }

  render() {
    const {
      type, label, name, placeholder, value, error, hasFootnote
    } = this.state
    return (
      <div className={`input-box personal-detail ${error ? "input-error" : ""}`}>
        <label
          className={hasFootnote ? "footnote-asterix" : ""}
          htmlFor={name}
        >{label}</label>
        <input
          {...{
            name,
            value
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
