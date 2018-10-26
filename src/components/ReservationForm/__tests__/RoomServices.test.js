import RoomServices from "../RoomServices"
import {Loading} from "../../shared/Elements"


describe("RoomServices component", () => {
  const props = {roomServices: [],
    reservation: {roomId: 1}}
  const wrapper = mount(<RoomServices {...props}/>)

  beforeEach(() => {
    wrapper.setProps(props)
  })
  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("shows spinner when no roomServices yet", () => {
    expect(wrapper.find(Loading).length).toBe(1)
  })


  describe("Room service list", () => {
    const newProp = {roomServices: [
      [
        0, {
          inRoom: [1], name: "name", icon: "icon.svg"
        }
      ]
    ]}
    beforeEach(() => {
      wrapper.setProps(newProp)
    })

    it("renders", () => {
      expect(wrapper.find(".room-service").length).toBe(1)
    })
    it("propagates props", () => {
      expect(wrapper.find(".room-service").find("img").prop("alt")).toBe(newProp.roomServices[0][1].name)
      expect(wrapper.find(".room-service").hasClass("service-in-room")).toBe(true)
      expect(wrapper.find(".room-service").find("span").prop("children")).toBe(newProp.roomServices[0][1].name)
      expect(wrapper.find(".room-service").find("img").prop("src")).toBe(newProp.roomServices[0][1].icon)
    })

    it("fade icon if not in room", () => {
      wrapper.setProps({roomServices: [[...newProp.roomServices, {...newProp.roomServices[0][1], inRoom: []}]]})
      expect(wrapper.find(".room-service").hasClass("service-in-room")).toBe(false)
    })
  })
})