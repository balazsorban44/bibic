import {
  Rooms, Room, RoomSlider, Slide, Dots
} from "../Rooms"
import {Loading} from "../shared/Elements"

global.clearInterval = jest.fn()
jest.useFakeTimers()
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
      wrapper.setProps({rooms: [{id: 1}, {id: 2}]})
      expect(wrapper.find(Room)).toHaveLength(2)
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
  const delay = 1000
  const props = {pictures: [{id: 0}, {id: 2}], delay}
  const wrapper = shallow(<RoomSlider {...props}/>)


  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("Next button", () => {

    it("click shows next slide", () => {
      const prevIndex = wrapper.state("activeIndex")
      wrapper.find(".room-slider-next-btn").simulate("click")
      expect(wrapper.state("activeIndex")).toBeGreaterThan(prevIndex)
    })

    it("when on last slide, go to first", () => {
      wrapper.setState({activeIndex: props.pictures.length - 1})
      wrapper.find(".room-slider-next-btn").simulate("click")
      expect(wrapper.state("activeIndex")).toBe(0)
    })
  })

  it("slides change after given delay", () => {
    const prevIndex = wrapper.state("activeIndex")
    jest.advanceTimersByTime(delay)
    expect(wrapper.state("activeIndex")).toBeGreaterThan(prevIndex)
  })

  it("unmount clears ticker", () => {
    const {interval} = wrapper.instance()
    wrapper.unmount()
    expect(clearInterval).toBeCalledWith(interval)
  })

})

describe("Slide component", () => {
  const props = {picture: {}}
  const wrapper = shallow(<Slide {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("First slide", () => {
    wrapper.setProps({active: true})
    it("has first slide class", () => {
      expect(wrapper.hasClass("room-first-slide")).toBe(true)
    })
    it("z-index set", () => {
      expect(wrapper.prop("style").zIndex).toBe(99)
    })
  })
})

describe("Dots component", () => {
  const wrapper = shallow(<Dots/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("active dot is marked", () => {
    const newProps = {length: 3, activeIndex: 2}
    wrapper.setProps(newProps)
    expect(wrapper
      .find(".room-slider-dots")
      .childAt(newProps.activeIndex)
      .hasClass("active-slide")
    )
      .toBe(true)
  })
})