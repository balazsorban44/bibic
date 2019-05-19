import {Menu, BackMenu} from "../Menu"
import {MemoryRouter} from "react-router"

describe("Menu component", () => {
  const props = {rooms: [{id: 1}]}
  const wrapper = shallow(
    <MemoryRouter>
      <Menu {...props}/>
    </MemoryRouter>
  )

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("Navigation menu", () => {
    const navMenu = wrapper.dive().dive().find("ul").first()

    it.skip("has 8 elements", () => {
      expect(navMenu.find("li").length).toBe(8)
    })

    it.skip("clicking element hides menu", () => {
      wrapper.setState({isMenuOpen: true, isRoomMenuOpen: true})
      navMenu.find("li").first().simulate("click")
      expect(wrapper.state("isMenuOpen")).toBe(false)
      expect(wrapper.state("isRoomMenuOpen")).toBe(false)
    })
  })

  it.skip("handleShowRoomMenu", () => {
    wrapper.childAt(0).childAt(0).instance().handleShowRoomMenu()
    expect(wrapper.childAt(0).childAt(0).state("isRoomMenuOpen")).toBe(true)
  })

  it.skip("handleHideRoomMenu", () => {
    wrapper.childAt(0).childAt(0).instance().handleHideRoomMenu()
    expect(wrapper.childAt(0).childAt(0).state("isRoomMenuOpen")).toBe(false)
  })

  it.skip("handleHideMenu", () => {
    wrapper.childAt(0).childAt(0).instance().handleHideMenu()
    expect(wrapper.childAt(0).childAt(0).state("isRoomMenuOpen")).toBe(false)
    expect(wrapper.childAt(0).childAt(0).state("isMenuOpen")).toBe(false)
  })

  it.skip("handleMenuToggle", () => {
    wrapper.childAt(0).childAt(0).setState({isMenuOpen: false})
    wrapper.childAt(0).childAt(0).instance().handleMenuToggle()
    expect(wrapper.childAt(0).childAt(0).state("isMenuOpen")).toBe(true)
    wrapper.childAt(0).childAt(0).instance().handleMenuToggle()
    expect(wrapper.childAt(0).childAt(0).state("isMenuOpen")).toBe(false)
  })
})


describe("BackMenu component", () => {
  const wrapper = shallow(<BackMenu/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})