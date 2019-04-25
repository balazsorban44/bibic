import {DateRangePicker} from "../../../../lib/react-date-range"
import Calendar from "../Calendar"
import {Date as DateLabel} from '../../../shared/Form'
import {sendNotification} from '../../../db/notification'
import {Loading} from '../../../shared/Elements'
import {
  addWeeks, addMonths, format, addDays
} from "date-fns"


jest.mock('../../../db/notification', () => ({sendNotification: jest.fn()}))


describe("Calendar component", () => {

  const props = {
    overlaps: [{start: new Date(), end: addWeeks(new Date(), 1)}],
    fetchOverlaps: jest.fn(),
    rooms: [{unavailable: format(addMonths(new Date(), 1), "YYYY-MM-dd", {awareOfUnicodeTokens: true})}],
    reservation: {
      roomId: 1,
      from: new Date(),
      to: addDays(new Date(), 1)
    },
    updateReservation: jest.fn()
  }

  const wrapper = mount(<Calendar {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("DateRangePicker", () => {
    it("renders when fetched", async () => {
      expect.assertions(1)
      await wrapper.childAt(0).instance().componentDidMount()
      wrapper.update()
      expect(wrapper.find(DateRangePicker).length).toEqual(1)
    })

    it("propagates date change", () => {
      const change = {selection: {startDate: new Date(), endDate: new Date()}}
      const spy = jest.spyOn(wrapper.childAt(0).instance(), "handleSelect")
      // wrapper.find(DateRangePicker).simulate("change", change)
      wrapper.childAt(0).instance().handleSelect(change)
      expect(spy).toBeCalledWith(change)
      expect(props.updateReservation).toBeCalledTimes(2)
      expect(props.updateReservation).toBeCalledWith("from", format(change.selection.startDate, "YYYY-MM-dd", {awareOfUnicodeTokens: true}))
      expect(props.updateReservation).toBeCalledWith("to", format(change.selection.endDate, "YYYY-MM-dd", {awareOfUnicodeTokens: true}))
      expect(sendNotification).toBeCalledWith("calendarSelectSuccess")
    })

  })

  describe("Contains", () => {
    it("label for start date", () => {
      expect(wrapper.find({name: "from"}).contains(DateLabel)).toBe(true)
    })

    it("label for end date", () => {
      expect(wrapper.find({name: "to"}).contains(DateLabel)).toBe(true)
    })

    /**
     * NOTE: Local implementation
     * @see https://github.com/Adphorus/react-date-range/issues/231
     */
  })

  describe("Overlaps", () => {
    it("room change fetches overlaps", () => {
      const roomId = props.reservation.roomId + 1
      wrapper.setProps({reservation: {...props.reservation,
        roomId}})
      expect(props.fetchOverlaps).toBeCalledWith(roomId)
    })


    /*
     * it("change is propagated", async () => {
     *   expect.assertions(4)
     *   const asyncWrapper = await mount(<Calendar {...props}/>)
     *   await asyncWrapper.childAt(0).instance().componentDidMount()
     *   const dateRangePicker = await asyncWrapper.childAt(0).find(DateRangePicker)
     *   const startDate = TOMORROW.clone().add(2, "week").toDate()
     *   const endDate = TOMORROW.clone().add(3, "week").toDate()
     *   dateRangePicker.simulate("change", {selection: {startDate, endDate}})
     *   expect(props.updateReservation).toBeCalledTimes(2)
     *   expect(props.updateReservation).toBeCalledWith("from", format(startDate, "YYYY-MM-dd", {awareOfUnicodeTokens: true}))
     *   expect(props.updateReservation).toBeCalledWith("to", format(endDate, "YYYY-MM-dd", {awareOfUnicodeTokens: true}))
     *   expect(sendNotification).toBeCalledWith("calendarSelectSuccess")
     * })
     */


    /*
     * it("gets disabled", () => {
     *   expect(
     *     dateRangePicker.findWhere(e =>
     *       e.hasClass("rdrDay") && e.contains(TOMORROW.clone().add(1, "day").format("DD"))
     *     ).hasClass("rdrDayDisabled")
     *   ).toBe(true)
     * })
     */
  })
})


