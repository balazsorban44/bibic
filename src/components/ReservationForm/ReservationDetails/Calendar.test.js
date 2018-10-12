import {mount} from 'enzyme'
import React from 'react'
import {DateRangePicker} from "react-date-range"
import {TOMORROW} from '../../../utils/constants'
import moment from "../../../lib/moment"


/**
 * @see https://github.com/Adphorus/react-date-range/issues/231
 */

it("DateRangePicker is handling the overlaps", () => {
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