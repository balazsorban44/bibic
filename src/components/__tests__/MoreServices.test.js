import MoreServices from "../MoreServices"

global.scrollTo = jest.fn()

describe("MoreServices component", () => {
  const wrapper = shallow(<MoreServices/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("scrolls to top on mount", () => {
    expect(scrollTo).toBeCalled()
  })

})
