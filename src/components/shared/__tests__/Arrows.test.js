import React from 'react'
import {mount} from 'enzyme'
import {Prev, Next} from '../Elements'


describe("Arrow components", () => {

  describe("Prev", () => {
    const props = {previousSlide: jest.fn()}
    const wrapper = mount(<Prev {...props}/>)
    test("renders correctly", () => {
      expect(wrapper).toHaveLength(1)
    })

    test("click event is handled", () => {
      wrapper.find(".slider-arrow").simulate("click")
      expect(props.previousSlide).toBeCalled()
    })
  })

  describe("Next", () => {
    const props = {nextSlide: jest.fn()}
    const wrapper = mount(<Next {...props}/>)
    test("renders correctly", () => {
      expect(wrapper).toHaveLength(1)
    })

    test("click event is handled", () => {
      wrapper.find(".slider-arrow").simulate("click")
      expect(props.nextSlide).toBeCalled()
    })
  })
})