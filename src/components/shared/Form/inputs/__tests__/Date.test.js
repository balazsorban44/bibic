import React from 'react'
import {mount} from 'enzyme'
import Date from '../Date'
import moment from "../../../../../lib/moment"

describe("Date component", () => {
  const props = {
    hasFootnote: true,
    label: "label",
    name: "name",
    notification: jest.fn(),
    value: moment().toDate()
  }
  const wrapper = mount(<Date {...props}/>)

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })


  describe("Input div", () => {
    const inputDiv = wrapper.findWhere(e => e.hasClass("input-box"))

    test("click send notification", () => {
      inputDiv.simulate("click")
      expect(wrapper.prop("notification")).toBeCalledWith("useCalendarAsInput")
    })

  })

  describe("Input", () => {

    test("inherits right props", () => {
      const input = wrapper.find("input")
      expect(input.prop("id")).toBe(props.name)
      expect(input.prop("name")).toBe(props.name)
      expect(input.prop("readOnly")).toBe(true)
    })

    describe("Value", () => {
      test("formatted date if specified", () => {
        expect(wrapper.find("input").prop("value")).toBe(moment(props.value).format("LL"))
      })

      test("Message if not specified", () => {
        wrapper.setProps({value: null})
        expect(wrapper.find("input").prop("value")).toBe("Nincs megadva")
      })
    })

  })

  describe("Label", () => {

    test("inherits label text", () => {
      expect(wrapper.find("label").prop("children")).toBe(props.label)
    })

    describe("Footnote", () => {
      test("has", () => {
        wrapper.setProps({hasFootnote: true})
        expect(wrapper.find("label").hasClass("footnote-asterix")).toBe(true)
      })
      test("has not", () => {
        wrapper.setProps({hasFootnote: false})
        expect(wrapper.find("label").hasClass("footnote-asterix")).toBe(false)
      })
    })
  })


})