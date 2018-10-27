import {Menu, BackMenu} from "../Menu"
import {MemoryRouter} from "react-router"

describe("Menu component", () => {
  const props = {hero: [], rooms: [{id: 1}]}
  const wrapper = mount(
    <MemoryRouter>
      <Menu {...props}/>
    </MemoryRouter>
  )

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })


  it("handleShowRoomMenu", () => {
    wrapper.childAt(0).childAt(0).instance().handleShowRoomMenu()
    expect(wrapper.childAt(0).childAt(0).state("isRoomMenuOpen")).toBe(true)
  })

  it("handleHideRoomMenu", () => {
    wrapper.childAt(0).childAt(0).instance().handleHideRoomMenu()
    expect(wrapper.childAt(0).childAt(0).state("isRoomMenuOpen")).toBe(false)
  })

  it("handleHideMenu", () => {
    wrapper.childAt(0).childAt(0).instance().handleHideMenu()
    expect(wrapper.childAt(0).childAt(0).state("isRoomMenuOpen")).toBe(false)
    expect(wrapper.childAt(0).childAt(0).state("isMenuOpen")).toBe(false)
  })

  it("handleMenuToggle", () => {
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