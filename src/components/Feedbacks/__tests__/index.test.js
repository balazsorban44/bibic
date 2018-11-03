import {Loading} from "../../shared/Elements"
import {Feedbacks, Feedback} from "../"
describe("Feedbacks component", () => {
  const props = {feedbacks: {rooms: [], all: []}}
  const wrapper = shallow(<Feedbacks {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("shows loading", () => {
    expect(wrapper.find(Loading).length).toBe(1)
  })

  it("if feedbacks fetched, shows a list of them", () => {
    wrapper.setProps({feedbacks: {all: [{}], rooms: []}})
    expect(wrapper.find(Feedback).length).toBe(1)
  })
})


describe("Feedback component", () => {
  const props = {
    timestamp: moment(), content: "content", roomId: 1, ratings: {coffee: 1}
  }
  const wrapper = shallow(<Feedback {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("if no content, content is rating stars", () => {
    wrapper.setProps({content: ""})
    expect(wrapper.find("p").prop("children")).toBe("*")
  })
})