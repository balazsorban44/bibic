import React, {Component, Fragment} from 'react'
import PeopleCount from "./PeopleCount"


export default class Children extends Component {

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