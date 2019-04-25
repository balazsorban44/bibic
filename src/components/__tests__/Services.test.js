import Services from "../Services"

describe("Services component", () => {
  const wrapper = shallow(<Services/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

})