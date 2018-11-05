import {ChatFAB} from "../ChatFAB"
import Fade from "react-reveal/Fade"


describe("ChatFAB component", () => {
  const props = {hero: []}
  const wrapper = shallow(<ChatFAB {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("Fades when hero images loaded", () => {
    wrapper.setProps({hero: [1,2,3]})
    expect(wrapper.find(Fade).prop("when")).toBe(true)
  })
})