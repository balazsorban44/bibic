
import Stars from "../Stars"

describe("Stars component", () => {
  const wrapper = shallow(<Stars/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("size is calculated correctly", () => {
    wrapper.setProps({size: 32})
    expect(wrapper.find("polygon").first().prop("style").transform).toContain(32/25)
  })
})