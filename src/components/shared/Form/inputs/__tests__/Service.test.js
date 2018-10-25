import React from 'react'
import {mount} from 'enzyme'
import Service from '../Service'


describe("Service component", () => {
  const props = {
    label: "label",
    name: "name",
    value: "value",
    checked: true,
    onChange: jest.fn()
  }
  const wrapper = mount(
    <Service {...props}/>
  )

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })


  describe("Label", () => {
    const label = wrapper.find("label")

    test("for input value", () => {
      expect(label.prop("htmlFor")).toContain(props.value)
    })

    test("inherits label text", () => {
      expect(label.prop("children")).toBe(props.label)
    })

  })

  describe("Input", () => {
    const input = wrapper.find("input")

    const {
      name, value, onChange, checked
    } = props

    test("inherits right props", () => {
      expect(input.prop("name")).toBe(name)
      expect(input.prop("value")).toBe(value)
      expect(input.prop("id")).toBe(value)
      expect(input.prop("checked")).toBe(checked)
    })

    test("type is radio", () => {
      expect(input.prop("type")).toBe("radio")
    })

    test("change is propagated", () => {
      input.simulate("change", {target: {name, value}})
      expect(onChange).toBeCalledWith(name, value)
    })
  })


})