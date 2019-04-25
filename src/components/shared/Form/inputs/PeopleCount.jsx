import React, {Component} from 'react'

export default class PeopleCount extends Component {

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
    const {min, max} = this.state
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