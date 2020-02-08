import React, {Component} from 'react'
import {withTranslation} from 'react-i18next'

class PeopleCount extends Component {

  state = {
    min: 0,
    max: 0,
    name: "",
    value: 0
  }

  static getDerivedStateFromProps = ({
    min,
    max,
    name,
    value
  }) => (
    {
      min,
      max,
      name,
      value: parseInt(value, 10)
    }
  )

  handleChange = e => {
    e.preventDefault()
    const {name} = e.target
    let {target: {value}} = e
    value = parseInt(value, 10)
    const {min, max} = this.state
    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }

    this.setState({value})
    this.props.onChange({[name]: value}, [name, "peopleCount"])
  }

  render() {
    const {
      min, max, name, value
    } = this.state
    const {t, hasFootnote, inputProps} = this.props
    const label = t(`reservation.${name}.label`)
    return (
      <div className="input-box people-count">
        <label
          className={hasFootnote ? "footnote-asterix": ""}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          {...inputProps}
          {...{
            min,
            max,
            name,
            value
          }}
          readOnly
          type="number"
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


export default withTranslation()(PeopleCount)