import React from 'react'
import {
  render,
  fireEvent,
  cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

import Input from './Input'

afterEach(cleanup)

it("renders correctly", () => {
  expect(render(<Input/>).asFragment()).toMatchSnapshot()
})

it("shows error", () => {
  const {container} = render(<Input error="something"/>)
  expect(container.firstChild.classList).toContain("input-error")
  expect(container.querySelector("h6")).toHaveTextContent("something")
})

it("adds footnote-asterix class when required", () => {
  expect(
    render(
      <Input
        label="something"
        required
      />
    ).container
      .querySelector(".footnote-asterix")
  )
    .toHaveTextContent("something")

  expect(
    render(
      <Input label="something"/>
    )
      .container
      .querySelector("label").classList
  )
    .not.toContain("footnote-asterix")
})

describe("handle events", () => {
  let c
  const changeFn = jest.fn()
  beforeEach(() => {c = render(
    <Input
      name="name"
      onChange={changeFn}
      value="a value"
    />
  )})
  afterEach(cleanup)

  it("handle change", () => {
    fireEvent.change(c.getByValue("a value"), {target: {value: "new value"}})
    expect(c.container.querySelector("input").value).toBe("new value")
  })

  it("blur propagates", () => {
    fireEvent.change(c.getByValue("a value"), {target: {value: "new value"}})
    fireEvent.blur(c.getByValue("new value"))
    expect(changeFn).toBeCalledWith({name: "new value"})
  })
})