import {Loading} from "../../shared/Elements"
import {Feedbacks, Feedback} from "../"
import Stars from "../Stars"
describe("Feedbacks component", () => {
  const props = {feedbacks: {rooms: [], all: []}}
  const wrapper = shallow(<Feedbacks {...props}/>)

  beforeEach(() => {
    wrapper.setProps(props)
  })

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("shows loading", () => {

    expect(wrapper.find(Loading).length).toBe(1)
  })

  it("feedbacks fetched, show a list of Feedback", () => {
    wrapper.setProps({feedbacks: {all: [1,2,3], rooms: []}})
    expect(wrapper.find(Feedback).length).toBe(3)
  })

  it("all rooms' average calculated", () => {
    wrapper.setProps({feedbacks: {all: [], rooms: [1,2,3,4,5,6]}})
    expect(wrapper.find(Stars).first().prop("value")).toBe(((1+2+3+4+5+6)/6).toFixed(2).toString())
  })

  describe("individual averages calculated", () => {
    const newFeedbacks = {all: [1,2,3,4,5,6], rooms: [1,2,3,4,5,6]}
    Array(newFeedbacks.rooms.length).fill(null).map((_e, i) =>
      it(`${i+1}. average `, () => {
        wrapper.setProps({feedbacks: newFeedbacks})
        expect(wrapper.find(Stars).get(i+1).props.value).toBe(newFeedbacks.rooms[i])
      })
    )
  })
})


describe("Feedback component", () => {
  const props = {
    timestamp: moment(new Date("2018-11-4")).startOf("day"), content: "content", roomId: 1, ratings: {coffee: 1}
  }
  const wrapper = shallow(<Feedback {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("if no content, content is rating stars \n\t(eg.: 3 > ***)", () => {
    wrapper.setProps({content: ""})
    expect(wrapper.find("p").prop("children")).toBe("*")
  })
})