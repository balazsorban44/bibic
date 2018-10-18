import {shallow} from 'enzyme'
import React from 'react'
import ReservationDetails from ".."

const wrapper = shallow(
  <ReservationDetails />
)

describe("ReservationDetails component", () => {

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })


})