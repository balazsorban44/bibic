import {RoomMenu} from "../RoomMenu"
import {Link} from 'react-scroll'

describe("RoomMenu component", () => {
  const props = {
    rooms: [{id: 1}], isBigScreen: true, onClick: jest.fn()
  }
  const wrapper = shallow(<RoomMenu {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe("different screen size", () => {
    it("big screen", () => {
      expect(wrapper.find(Link).first().prop("offset")).toBe(-106)
    })
    it("small screen", () => {
      wrapper.setProps({isBigScreen: false})
      expect(wrapper.find(Link).first().prop("offset")).toBe(-40)
    })

  })

  it("renders li element for each room", () => {
    expect(wrapper.find("li").length).toBe(props.rooms.length)
  })
})