import React from 'react'
import {mount} from 'enzyme'
import Message from '../Message'


describe("Message component", () => {
  const reservation = {message: "Test message"}
  const updateReservation = jest.fn()
  const wrapper = mount(
    <Message
      reservation={reservation}
      updateReservation={updateReservation}
    />
  )

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("textarea", () => {
    const textArea = wrapper.find("textarea")

    test("message is shown", () => {
      expect(textArea.prop("value")).toBe(wrapper.prop("reservation").message)
    })

    test("writing is handled", () => {
      const name = textArea.prop("name")
      const value = "Message changed"
      textArea.simulate("change", {target: {name, value}})
      expect(updateReservation).toBeCalledWith(name, value)
    })
  })


})