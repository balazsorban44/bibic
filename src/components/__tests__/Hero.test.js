import {Hero, CarouselUI} from "../Hero"
import {Loading} from "../shared/Elements"

describe("Hero component", () => {
  const props = {hero: []}
  const wrapper = shallow(<Hero {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("shows images when fetched", () => {
    expect(wrapper.find(".hero-slide").length).toBe(2)
  })

})


describe("CarouselUI component", () => {
  const props = {}
  const wrapper = shallow(<CarouselUI {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
})