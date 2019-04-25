import Paragraphs from '../Paragraphs'
import {Loading} from '../Elements'


describe("Paragraphs component", () => {
  const props = {path: "path",
    paragraphs: {path: [{text: "Test text"}]}}
  const wrapper = mount(<Paragraphs {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("maps over paragraphs", () => {
    expect(wrapper.find("p").prop("children")).toBe(props.paragraphs["path"][0].text)
  })

  it("shows loading if no paragraphs", () => {
    wrapper.setProps({path: ""})
    expect(wrapper.find(Loading).length).toBe(1)
  })


})