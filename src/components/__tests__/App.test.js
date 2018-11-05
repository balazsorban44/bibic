import App, {Main} from "../App"

describe("App component", () => {
  const props = {}
  const wrapper = shallow(<App {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })
})


describe("Main component", () => {
  const wrapper = shallow(<Main/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})