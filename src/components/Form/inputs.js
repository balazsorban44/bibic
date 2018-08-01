import React, {Component, Fragment} from 'react'
import {valid} from '../../utils/validate'
import moment from 'moment'
import {Loading} from "../shared/Elements"
class PersonalDetail extends Component {

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


const Date = ({
  notification, name, label, value, hasFootnote
}) => (
  <div
    className="input-box"
    onClick={() => notification("Kérjük válasszon érkezési és távozási dátumot a naptáron!")}
  >
    <label
      className={hasFootnote ? "footnote-asterix" : ""}
      htmlFor={name}
    >
      {label}
    </label>
    <input
      readOnly
      {...{name}}
      value={moment(value).format("LL")}
    />
  </div>
)


class PeopleCount extends Component {

  state = {
    hasFootnote: false,
    min: 0,
    max: 0,
    name: "",
    label: "",
    placeholder: "",
    value: 0
  }

  static getDerivedStateFromProps = ({
    value,
    hasFootnote,
    min,
    max,
    name,
    label,
    placeholder
  }) => (
    {
      value: parseInt(value, 10),
      hasFootnote,
      min,
      max,
      name,
      label,
      placeholder
    }
  )

  handleChange = e => {
    e.preventDefault()
    const {name} = e.target
    let {target: {value}} = e
    value = parseInt(value, 10)
    const {
      min, max
    } = this.state
    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }

    this.setState({value})
    this.props.onChange(name, value)
  }

  render() {
    const {
      hasFootnote, min, max, name, label, placeholder, value
    } = this.state
    return (
      <div className="input-box people-count">
        <label
          className={hasFootnote ? "footnote-asterix": ""}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          {...{
            min,
            max,
            placeholder,
            name
          }}
          readOnly
          type="number"
          value={`${value }`}
        />
        <div className="number-controls">
          <button
            {...{name}}
            onClick={this.handleChange}
            value={value - 1}
          >-</button>
          <button
            {...{name}}
            onClick={this.handleChange}
            value={value + 1}
          >+</button>
        </div>
      </div>
    )
  }
}


class Children extends Component {

  state = {
    values: [],
    max: 100
  }

  static getDerivedStateFromProps = ({
    values, max
  }) => (
    {
      values,
      max
    }
  )

  handleChange = (name, value) => {
    const {max} = this.state
    let {values} = this.state
    value = parseInt(value, 10)

    if (values.length < value) {
      values.push("6-12")
      values = values.slice(0, max)
    }
    if (values.length > value) {
      values.pop()
    }

    this.props.onChange("children", values)
  }

  handleSelect = ({target: {
    name, value
  }}) => {
    const {values} = this.state
    values[name] = value
    this.setState({values})
    this.props.onChange("children", values)
  }

  render() {
    const {
      hasFootnote, name, label, max
    } = this.props
    const {values} = this.state

    return (
      <Fragment>
        <PeopleCount
          {...{
            hasFootnote,
            name,
            label,
            max
          }}
          min={0}
          onChange={this.handleChange}
          placeholder={0}
          value={values.length}
        />
        <div className="children-age">
          {values.length >= 1 && values.map((childAge, index) => {
            return (
              <div
                className="input-box child-age"
                key={index}
              >
                <label htmlFor={index}>{index+1}. kor</label>
                <select
                  name={index}
                  onChange={this.handleSelect}
                  value={childAge}
                >
                  <option value="0-6" >0-6 év</option>
                  <option value="6-12">6-12 év</option>
                </select>
              </div>
            )
          })}
        </div>
      </Fragment>
    )
  }
}


const Service = ({
  label, name, onChange, checked, value
}) => (
  <div className="input-box service">
    <label htmlFor={value}>{label}</label>
    <input
      {...{
        name,
        value,
        checked
      }}
      id={value}
      onChange={({target: {
        name, value
      }}) => onChange(name, value)}
      type="radio"
    />
  </div>
)


const Send = ({
  disabled, onClick, children
}) =>
  <Fragment>
    {disabled ?
      <div style={{padding: "24px 0 48px"}} >
        <Loading/>
      </div> :
      <button
        {...{onClick}}
        className={`submit-reservation ${disabled ? "active-reserving": ""}`}
        type="submit"
      >{children}
      </button>
    }
  </Fragment>


export {PersonalDetail, Children, Date, PeopleCount, Service, Send}