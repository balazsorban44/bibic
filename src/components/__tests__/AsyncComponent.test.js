import React from 'react'
import lazy from "../AsyncComponent"
import {Loading} from '../shared/Elements'


describe("AsyncComponent component", () => {
  const Test = () => <div>Test component</div>

  it("renders Loading", () => {
    const Component = lazy(() => import(Test))
    const wrapper = shallow(<Component/>)
    expect(wrapper.type()).toBe(Loading)
  })

  /*
   * it("when component loaded, render it", async () => {
   *   expect.assertions(1)
   *   const Component = await lazy(() => import(Test))
   *   const wrapper = await mount(<Component/>)
   *   await wrapper.instance().componentDidMount()
   *   expect(wrapper.type()).toBe(Test)
   * })
   */
})
