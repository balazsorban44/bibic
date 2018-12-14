import {Menu, BackMenu} from "../Menu"
import {MemoryRouter} from "react-router"

describe.skip("Menu component", () => {
  const props = {hero: [], rooms: [{id: 1}]}
  const wrapper = shallow(
    <MemoryRouter>
      <Menu {...props}/>
    </MemoryRouter>
  )

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
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