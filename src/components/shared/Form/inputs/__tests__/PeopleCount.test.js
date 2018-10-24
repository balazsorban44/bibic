import React from 'react'
import {mount} from 'enzyme'
import PeopleCount from '../PeopleCount'


describe("PeopleCount", () => {
  const value = 2
  const min = 1
  const updateReservation = jest.fn()
  const wrapper = mount(
    <PeopleCount
      max={3}
      min={min}
      onChange={updateReservation}
      value={value}
    />
  )
  const buttons = wrapper.find("button")

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("Footnote", () => {
    test("is not present", () => {
      wrapper.setProps({hasFootnote: false})
      expect(wrapper.find("label").hasClass("footnote-asterix")).toBe(false)
    })
    test("is present", () => {
      wrapper.setProps({hasFootnote: true})
      expect(wrapper.find("label").hasClass("footnote-asterix")).toBe(true)
    })
  })

  describe("Increase", () => {
    const newValue = value + 1
    const increaseButton = buttons.findWhere(e => e.prop("value") === newValue)

    test("add 1 if maxPeople not reached", () => {
      increaseButton.simulate("click", {target: {name, value: newValue}})
      expect(updateReservation).toBeCalledWith(name, newValue)
    })

    test("do not add if maxPeople reached", () => {
      wrapper.setProps({max: 2})
      increaseButton.simulate("click", {target: {name, value: newValue}})
      expect(updateReservation).toBeCalledWith(name, value)
    })
  })

  describe("Decrease", () => {
    const decreaseButton = buttons.findWhere(e => e.prop("value") === value - 1)

    test("do not allow less than 1", () => {
      decreaseButton.simulate("click", {target: {name, value: 0}})
      expect(updateReservation).toBeCalledWith(name, min)
    })
  })
})