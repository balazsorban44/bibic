import App, {Main, NotFound} from "../App"

describe("App component", () => {
  const props = {}
  const wrapper = shallow(<App {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
})


describe("NotFound component", () => {
  const wrapper = shallow(<NotFound/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe("Main component", () => {
  const wrapper = shallow(<Main/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})