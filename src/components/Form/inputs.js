import React, { Component, Fragment } from 'react'
import {isValid} from '../../utils/validate'
import moment from 'moment'

class PersonalDetail extends Component {

  state = {
    type: null,
    placeholder: "",
    label: "",
    name: "",
    value: "",
    required: false,
    error: false,
    errorMessage: ""
  }

  componentDidMount() {
    const {type, label, name, placeholder, required, errorMessage} = this.props
    this.setState({type, label, name, placeholder, required, errorMessage})
  }

  handleChange = ({target: {name, value}}) => this.setState({name, value})

  handleBlur = ({target: {name, value}}) => {
    let error = false
    if (isValid(name, value)) {
      this.props.onChange(name, value)
    } else {
      this.props.onChange(name, "")
      error = true
    }
    
    this.setState({error})
    // do not fire notification, if the user did not fill in any info, or the info was corrected
    if (error && value !== "") {
      this.props.notification("error", 
        <p>
          {this.state.errorMessage}<br/>
          Kérjük próbálja újra.
          Ha úgy gondolja hiba történt, kérjük írjon:<br/>
          <a href="mailto:hiba@bibicvedeghazak.hu">hiba@bibicvedeghazak.hu</a>
        </p>, 5000
      )  
    }
  }

  render() {
    const {type, label, name, placeholder, value, error, required} = this.state
    return (
      <div className={`input-box personal-detail ${error ? "input-error" : ""}`}>
        <label className={required ? "required-asterix" : ""} htmlFor={name}>{label}</label>
        <input {...{name, value, placeholder}}
          type={type || "text"}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </div>
    )
  }
}




const Date = ({onClick, name, label, value, required}) => (
  <div 
    className="input-box"
    onClick={() => onClick("warning", "Kérjük válasszon érkezési és távozási dátumot a naptáron!")} 
  >
    <label 
      className={required ? "required-asterix" : ""}
      htmlFor={name}
    >
      {label}
    </label>
    <input readOnly {...{name}} value={moment(value).format("LL")}/>
  </div>
)


class PeopleCount extends Component {

  state = {
    required: false,
    min: 0,
    name: "",
    label: "",
    placeholder: "",
    value: 0
  }

  componentDidMount() {
    const {required, min, name, label, placeholder, value} = this.props
    this.setState({
      value: parseInt(value, 10),
      required, min, name, label, placeholder
    })
  }
  
  componentWillReceiveProps = ({value}) => {
    this.setState({
      value: parseInt(value, 10)
    })
  }

  handleChange = e => {
    e.preventDefault()
    let {target: {name, value}} = e
    value = parseInt(value, 10)
    if (!isValid(name, value)) {
      value = this.props.min
    }
    this.setState({value})
    this.props.onChange(name, value)
  }

  render() {
    const {required, min, name, label, placeholder, value} = this.state
    return (
      <div className="input-box people-count">
        <label 
          className={required ? "required-asterix": ""}
          htmlFor={name}
        >
          {label}
        </label>
        <input {...{min, placeholder, name}}
          type="number"
          value={value + ""}
          readOnly
        />
        <div className="people-buttons">
          <button {...{name}}
            value={value - 1}
            onClick={this.handleChange}
          >-</button>
          <button {...{name}}
            value={value + 1}
            onClick={this.handleChange}
          >+</button>
        </div>
      </div>
    )
  }
}



class Children extends Component {

  state = {
    values: []
  }

  componentWillReceiveProps = ({values}) => this.setState({values})
  
  componentDidMount() {
    this.setState({
      values: this.props.values
    })
  }


  handleChange = (name, value) => {
    let  {values} = this.state
    
    if (values.length < parseInt(value, 10)) {
      values.push("6-12")
    }
    else {
      values.pop()
    }
    this.props.onChange("children", values)
  }

  handleSelect = ({target: {name, value}}) => {
    let {values} = this.state
    values[name] = value
    this.setState({
      values
    })
    this.props.onChange("children", values)
  }

  render() {
    const {required, name, label} = this.props
    const {values} = this.state
    
    return (
      <Fragment>
        <PeopleCount {...{required, name, label}}
          min={0} placeholder={0}
          onChange={this.handleChange}
          value={values.length}
        />
        <div className="children-age">
          {values.length >= 1 && values.map((childAge, index) => {
            return (
              <div key={index} className="input-box child-age">
                <label htmlFor={index}>{index+1}. kor</label>
                <select 
                  value={childAge}
                  name={index}
                  onChange={this.handleSelect}
                >
                  <option value="0-6" >0-6</option>
                  <option value="6-12">6-12</option>
                </select>
              </div>
            )
          })}
        </div>
      </Fragment>
    )
  }
}


const Service = ({label, name, onChange, checked, value}) => (
  <div className="input-box service">
    <label htmlFor={value}>{label}</label>
    <input {...{name, value, checked}}
      type="radio"
      onChange={({target: {name, value}}) => onChange(name, value)}
      id={value}
    />
  </div>
)



export {PersonalDetail, Children, Date, PeopleCount, Service}