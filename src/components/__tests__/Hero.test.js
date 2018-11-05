import {Hero, CarouselUI} from "../Hero"
import {Loading} from "../shared/Elements"

describe("Hero component", () => {
  const props = {hero: []}
  const wrapper = shallow(<Hero {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("shows loading when no images yet", () => {
    expect(wrapper.find(Loading).length).toBe(1)
  })

  it("shows images when fetched", () => {
    const newProps = {hero: ["1.jpg", "2.jpg"]}
    wrapper.setProps(newProps)
    expect(wrapper.find(".hero-slide").length).toBe(newProps.hero.length)
  })

})


describe("CarouselUI component", () => {
  const props = {}
  const wrapper = shallow(<CarouselUI {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
})