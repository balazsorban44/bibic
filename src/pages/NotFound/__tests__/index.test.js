import NotFound from "../"

describe("NotFound component", () => {
  const wrapper = shallow(<NotFound/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
