import {mount} from 'enzyme'
import React from 'react'
import {DateRangePicker} from "../../../../lib/react-date-range"
import Calendar from "../Calendar"
import {Date as DateLabel} from '../../../shared/Form'
import moment from "../../../../lib/moment"
import {TOMORROW} from '../../../../utils/constants'
import Database from "../../../db"
import {MemoryRouter} from "react-router"

describe("Calendar component", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Database
        overlaps={[]}
        reservation={{roomId: 1}}
      >
        <Calendar />
      </Database>
    </MemoryRouter>
  )

  test("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("Contains children", () => {
    test("label for start date", () => {
      expect(wrapper.find({name: "from"}).contains(DateLabel)).toBe(true)
    })

    test("label for end date", () => {
      expect(wrapper.find({name: "to"}).contains(DateLabel)).toBe(true)
    })
  })

  describe("react-date-range is fetched at mount", () => {
    console.log(wrapper.find(Calendar))

  })


  /**
   * NOTE: Local implementation
   * @see https://github.com/Adphorus/react-date-range/issues/231
   */
  test("handling overlaps", () => {
    const overlaps = Array
      .from(moment
        .range(TOMORROW, TOMORROW.clone()
          .add(1, "week")).by("day")
      ).map(day => day.toDate())

    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }

    const component = mount(
      <DateRangePicker
        disabledDates={overlaps}
        minDate={new Date()}
        ranges={[selectionRange]}
      />
    )

    expect(
      component.findWhere(e =>
        e.hasClass("rdrDay") &&
      e.contains(TOMORROW.clone().add(1, "day").format("DD"))
      ).hasClass("rdrDayDisabled")
    ).toBe(true)
  })
})

