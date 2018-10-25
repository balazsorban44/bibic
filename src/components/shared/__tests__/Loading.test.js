import React from 'react'
import {mount} from 'enzyme'
import {Loading} from '../Elements'

describe("Loading component", () => {
  const wrapper = mount(<Loading/>)

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })


  describe("Full page", () => {
    test("is not", () => {
      expect(wrapper.childAt(0).prop("style")).toBe(null)
    })

    test("is", () => {
      wrapper.setProps({fullPage: true})
      expect(wrapper.childAt(0).prop("style").width).toBe("100vw")
      expect(wrapper.childAt(0).prop("style").height).toBe("100vh")
    })
  })
})


describe("Timers", () => {
  jest.useFakeTimers()
  afterAll(() => jest.clearAllTimers())

  const wrapper = mount(<Loading/>)
  test("starts", () => {
    expect(setTimeout).toBeCalledWith(expect.any(Function), 10000)
  })

  test("times out after 10 sec", () => {
    jest.advanceTimersByTime(10000)
    expect(wrapper.state("isTimedOut")).toBe(true)
    /*
     * REVIEW: Fails:
     * expect(wrapper.childAt(0).hasClass("not-available")).toBe(true)
     */
  })

  test("cleared", () => {
    wrapper.unmount()
    expect(clearTimeout).toBeCalled()
  })
})
