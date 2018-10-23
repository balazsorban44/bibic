import React from 'react'
import {shallow} from 'enzyme'
import ReservationDetails from ".."
// import {withStore} from '../../../db'

// jest.mock('../../../db', () => ({withStore: jest.fn()}))

describe("ReservationDetails component", () => {
  const wrapper = shallow(
    <ReservationDetails />
  )

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  /*
   * test("Context is available", () => {
   *   expect(withStore).toBeCalled()
   * })
   */

})