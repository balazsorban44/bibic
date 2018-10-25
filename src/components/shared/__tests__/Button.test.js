import React from 'react'
import {mount} from 'enzyme'
import {Button} from '../Elements'
import {MemoryRouter} from 'react-router'


describe("Button component", () => {
  const props = {label: "label",
    to: "/to"}
  const wrapper = mount(
    <MemoryRouter>
      <Button {...props}/>
    </MemoryRouter>
  )

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  test("props are propagated", () => {
    expect(wrapper.children().childAt(0).prop("to")).toBe(props.to)
    expect(wrapper.children().childAt(0).childAt(0).prop("children")).toBe(props.label)
  })

})