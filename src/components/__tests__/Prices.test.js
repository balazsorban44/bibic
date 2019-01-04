import {Prices} from "../Prices"


describe("Prices component", () => {
  const wrapper = shallow(<Prices/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})