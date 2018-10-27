import {
  Rooms, Room, RoomSlider, Slide
} from "../Rooms"
import {Loading} from "../shared/Elements"


describe("Rooms component", () => {
  const props = {
    rooms: [], galleries: {}, roomServices: [0,1,2,3,4]
  }
  const wrapper = shallow(<Rooms {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })


  it("show Loading when no rooms yet", () => {
    expect(wrapper.find(Loading)).toHaveLength(1)
  })

  describe("Room list", () => {
    it("shows when fetched", () => {
      wrapper.setProps({rooms: [{id: 1}]})
      expect(wrapper.find(Room)).toHaveLength(1)
    })

    it("pass pictures to Room", () => {
      const newProps = {rooms: [{id: 1}], galleries: {szobak: [{id:0}]}}
      wrapper.setProps(newProps)
      expect(wrapper.find(Room).prop("pictures")).toBe(newProps.galleries.szobak[0])
    })
    it("pass room services to Room", () => {
      expect(wrapper.find(Room).prop("services")).toBe(props.roomServices)
    })
  })

})

describe("Room component", () => {
  const props = {
    id: 1,
    name: "name",
    description: "description",
    pictures: [{id: 0}],
    services: []
  }
  const wrapper = shallow(<Room {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("show Loading when no services yet", () => {
    expect(wrapper.find(Loading)).toHaveLength(1)
  })


  describe("Img", () => {
    const newProps = {services: [
      [
        0, {
          inRoom: [0,1,2], name: "image name", icon: "icon.jpg"
        }
      ]
    ]}
    beforeAll(() => {
      wrapper.setProps(newProps)
    })

    it("show services when fetched", () => {
      expect(wrapper.find(".room-service").length).toBe(1)
    })

    it("inherits props", () => {
      expect(wrapper.find(".room-service").prop("title")).toBe(newProps.services[0][1].name)
      expect(wrapper.find(".room-service").prop("src")).toBe(newProps.services[0][1].icon)
      expect(wrapper.find(".room-service").prop("alt")).toBe(newProps.services[0][1].name)
    })

  })

})

describe("RoomSlider component", () => {
  const props = {pictures: {}}
  const wrapper = shallow(<RoomSlider {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
})

describe("Slide component", () => {
  const props = {picture: {}}
  const wrapper = shallow(<Slide {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
})