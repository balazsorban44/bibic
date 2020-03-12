import {ReservationForm} from "../"
import {Send} from "../../shared/Form"
import ReservationDetails from "../ReservationDetails"

global.scrollTo = jest.fn()


describe("ReservationForm component", () => {
  const props = {
    rooms: [],
    reservation: {roomId: 1,
      price: 0},
    isReserving: false,
    updateReservation: jest.fn(),
    submitReservation: jest.fn()
  }
  const wrapper = shallow(<ReservationForm {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("maxPeople", () => {

    it("default is one", () => {
      expect(wrapper.find(ReservationDetails).prop("maxPeople")).toBe(1)
    })
    it("calculated correctly", () => {
      wrapper.setProps({rooms: [ {prices:{metadata:{maxPeople: 2}}} ]})
      expect(wrapper.find(ReservationDetails).prop("maxPeople")).toBe(2)
    })
  })

  it("click on send submits the reservation", () => {
    wrapper.find(Send).simulate("click", {preventDefault: jest.fn()})
    expect(props.submitReservation).toBeCalled()
  })

})