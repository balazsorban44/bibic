import {
  FeedbackForm, RatingSlider, RatingValue, FeedbackDone
} from "../"
import {Loading} from "../../shared/Elements"
import {Send} from "../../shared/Form"

global.scrollTo = jest.fn()

describe("FeedbackForm component", () => {
  const props = {submitFeedback: jest.fn().mockResolvedValue({error: true, success: true})}
  const wrapper = shallow(<FeedbackForm {...props}/>)


  beforeEach(() => {
    wrapper.setState({error: false, success: false})
    wrapper.setProps({loading: false})
  })

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("scrolled to top", () => {
    expect(scrollTo).toBeCalledWith(0, 0)
  })

  it("Loading shows", () => {
    wrapper.setProps({loading: true})
    expect(wrapper.find(Loading).length).toBe(1)
  })

  it("Success shows", () => {
    wrapper.setState({success: true})
    expect(wrapper.find(FeedbackDone).length).toBe(1)
  })

  it("Error shows", () => {
    wrapper.setState({error: true})
    expect(wrapper.find(FeedbackDone).length).toBe(1)
  })

  it("submitting invoked", () => {
    wrapper.find(Send).simulate("click", {preventDefault: jest.fn()})
    expect(props.submitFeedback).toBeCalledWith({
      content: "",
      id: null,
      ratings: {
        cleanliness: 0,
        coffee: 0,
        comfort: 0,
        food: 0,
        services: 0,
        staff: 0
      }
    })
    // expect(wrapper.state("success")).toBe(true)
    // expect(wrapper.state("error")).toBe(true)
  })
})


describe("RatingSlider component", () => {
  const wrapper = shallow(<RatingSlider/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

})


describe("RatingValue component", () => {
  const props = {
    onChange: jest.fn(), name: "name", value: "value"
  }
  const wrapper = shallow(<RatingValue {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("click propagated", () => {
    wrapper.simulate("click")
    expect(props.onChange).toBeCalledWith(props.name, props.value)
  })
  it("gets active class", () => {
    wrapper.setProps({isActive: true})
    expect(wrapper.hasClass("rating-value-active")).toBe(true)
  })
})

describe("FeedbackDone component", () => {
  const wrapper = shallow(<FeedbackDone/>)
  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})