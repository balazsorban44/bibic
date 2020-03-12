import {Loading} from "../../../Elements"
import {Feedbacks, Feedback} from "../../Feedbacks"
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
    wrapper.setProps({feedbacks: {all: [{content: "test"}, {content: "***"}], rooms: []}})
    expect(wrapper.find(Feedback).length).toBe(1)
  })

  it("all rooms' average calculated", () => {
    wrapper.setProps({feedbacks: {all: [], rooms: {1: 5, 2: 1}}})
    expect(wrapper.find(Stars).first().prop("value")).toBe("3.00")
  })

  describe("individual averages calculated", () => {
    const newFeedbacks = {all: [{content: "Test"}], rooms: {1: 5, 2: 1}}
    Object.entries(newFeedbacks.rooms).map(([id, val], i) =>
      it(`${i+1}. average `, () => {
        wrapper.setProps({feedbacks: newFeedbacks})
        expect(
          wrapper
            .find(Stars)
            .findWhere(e => e.prop("title").includes(id)).props().value
        ).toBe(val.toFixed(2))
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