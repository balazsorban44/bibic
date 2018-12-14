import {Loading} from "../../shared/Elements"
import {Feedbacks, Feedback} from "../"
import Stars from "../Stars"
import {startOfDay} from "date-fns"
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
    wrapper.setProps({feedbacks: {all: [], rooms: [1,2]}})
    expect(wrapper.find(Stars).first().prop("value")).toBe("1.50")
  })

  describe("individual averages calculated", () => {
    const newFeedbacks = {all: [1,2,3,4,5,6], rooms: [1,2,3,4,5,6]}
    Array(newFeedbacks.rooms.length).fill(null).map((_e, i) =>
      it(`${i+1}. average `, () => {
        wrapper.setProps({feedbacks: newFeedbacks})
        expect(wrapper.find(Stars).get(i+1).props.value).toBe(newFeedbacks.rooms[i].toFixed(2))
      })
    )
  })
})


describe("Feedback component", () => {
  const props = {
    timestamp:  startOfDay(new Date("2018-11-4")), content: "content", roomId: 1, ratings: {coffee: 1}
  }
  const wrapper = shallow(<Feedback {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

})