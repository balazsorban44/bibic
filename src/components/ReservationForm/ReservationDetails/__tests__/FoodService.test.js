import React from 'react'
import {mount} from 'enzyme'
import FoodService from '../FoodService'
import {Service} from '../../../shared/Form'


describe("FoodService component", () => {
  const serviceTypes = ["breakfast", "halfBoard"]
  const reservation = {foodService: serviceTypes[0]}
  const wrapper = mount(
    <FoodService reservation={reservation}/>
  )

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  test("shows all service types", () => {
    expect(wrapper.find(Service)).toHaveLength(serviceTypes.length)
  })

  test("correct service is checked", () => {
    const selected =
      wrapper.findWhere(e =>
        e.type() === Service &&
        e.prop("value") === wrapper.prop("reservation").foodService
      )

    expect(selected.prop("checked")).toBe(true)

    const unSelecteds =
      wrapper.findWhere(e =>
        e.type() === Service &&
        e.prop("value") !== wrapper.prop("reservation").foodService
      )

    unSelecteds.map(unSelected =>
      expect(unSelected.prop("checked")).toBe(false)
    )
  })
})