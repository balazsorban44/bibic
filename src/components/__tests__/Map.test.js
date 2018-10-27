import Map, {Marker} from "../Map"

describe("Map component", () => {
  const props = {}
  const wrapper = shallow(<Map {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe("Marker component", () => {
  const wrapper = shallow(<Marker/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})