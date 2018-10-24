import React from 'react'
import {mount} from 'enzyme'
import People from '../People'
import {PeopleCount} from '../../../shared/Form'

describe("People component", () => {
  const reservation = {adults: 1,
    children : ["6-12", "6-12"]}
  const maxPeople = 4
  const updateReservation = jest.fn()
  const wrapper = mount(
    <People
      maxPeople={maxPeople}
      reservation={reservation}
      updateReservation={updateReservation}
    />
  )


  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("Adults", () => {
    const name = "adults"
    const Adults =
    wrapper.findWhere(e => e.type() === PeopleCount && e.prop("name") === name)

    test("has label", () => expect(Adults.props()).toHaveProperty("label"))

    test("has value", () => expect(Adults.prop("value")).toBe(reservation.adults))

    test("minimum 1 person", () => expect(Adults.prop("min")).toBe(1))

    test("placeholder is minimum", () => expect(Adults.prop("placeholder")).toBe(Adults.prop("min")))

    test("maximum is maxPeople minus the children", () => {
      expect(Adults.prop("max")).toBe(maxPeople - reservation.children.length)
    })


  })

  describe("Children", () => {
    const name = "children"
    const Children =
      wrapper.findWhere(e => e.type() === PeopleCount && e.prop("name") === name)

    test("has label", () => expect(Children.props()).toHaveProperty("label"))

    test("has value", () => expect(Children.prop("value")).toBe(reservation.children.length))

    test("minimum 0 person", () => expect(Children.prop("min")).toBe(0))

    test("placeholder is minimum", () => expect(Children.prop("placeholder")).toBe(Children.prop("min")))

    test("maximum is maxPeople minus the adults", () => {
      expect(Children.prop("max")).toBe(maxPeople - reservation.adults)
    })

  })


})