import {RoomSelector} from "../RoomSelector"
import {Loading} from "../../shared/Elements"


describe("RoomSelector component", () => {
  const props = {
    rooms: [],
    reservation: {roomId: 1},
    updateReservation: jest.fn()
  }

  beforeEach(() => {
    wrapper.setProps({rooms:[]})
  })
  const wrapper = shallow(<RoomSelector {...props}/>)
  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
  it("shows spinner when no rooms", () => {
    expect(wrapper.find(Loading).length).toBe(1)
  })

  describe("Rooms", () => {
    it("rendered", () => {
      wrapper.setProps({rooms:[{id: 1}, {id: 2}]})
      expect(wrapper.find(".room-picker-room").length).toBe(2)
    })
    it("active room marked", () => {
      wrapper.setProps({rooms:[{id: 1}, {id: 2}]})
      expect(wrapper.find(".room-active").prop("id")).toContain(props.reservation.roomId)
    })

    it("click selects the room", () => {
      wrapper.setProps({rooms:[{id: 1}, {id: 2}]})
      wrapper.findWhere(e => e.hasClass("button") && e.children().contains(2)).simulate("click")
      expect(props.updateReservation).toBeCalledWith("roomId", 2)
    })
  })
})