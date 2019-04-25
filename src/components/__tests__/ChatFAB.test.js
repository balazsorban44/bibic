import {ChatFAB} from "../ChatFAB"
import Fade from "react-reveal/Fade"


describe("ChatFAB component", () => {
  const props = {hero: []}
  const wrapper = shallow(<ChatFAB {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("Fades when hero images loaded", () => {
    expect(wrapper.find(Fade)).toHaveLength(1)
  })
})