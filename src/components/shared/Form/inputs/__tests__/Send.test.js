import React from 'react'
import {mount} from 'enzyme'
import Send from '../Send'
import {Loading} from '../../../Elements'


describe("Send component", () => {
  const onClick = jest.fn()
  const wrapper = mount(<Send onClick={onClick}/>)

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  test("shows spinner when loading", () => {
    wrapper.setProps({isLoading: true})
    expect(wrapper.find(Loading)).toHaveLength(1)
  })

  describe("submit button", () => {
    wrapper.setProps({isLoading: false})
    const submitButton = wrapper.find("button")
    test("show when not loading", () => {
      expect(submitButton).toHaveLength(1)
    })
    test("handles onClick", () => {
      submitButton.simulate("click")
      expect(onClick).toBeCalled()
    })
    test("type is submit", () => {
      expect(submitButton.prop("type")).toBe("submit")
    })
  })

})