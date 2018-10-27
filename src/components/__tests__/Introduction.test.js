import Introduction from "../Introduction"

describe("Introduction component", () => {
  const wrapper = shallow(<Introduction/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

})