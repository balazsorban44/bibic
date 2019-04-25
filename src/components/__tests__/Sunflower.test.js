import Sunflower from "../Sunflower"

describe("Sunflower component", () => {
  const wrapper = shallow(<Sunflower/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

})