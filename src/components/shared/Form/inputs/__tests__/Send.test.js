import Send from '../Send'
import {Loading} from '../../../Elements'


describe("Send component", () => {
  const onClick = jest.fn()
  const wrapper = mount(<Send onClick={onClick}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("shows spinner when loading", () => {
    wrapper.setProps({isLoading: true})
    expect(wrapper.find(Loading)).toHaveLength(1)
  })

  describe("submit button", () => {
    wrapper.setProps({isLoading: false})
    const submitButton = wrapper.find("button")
    it("show when not loading", () => {
      expect(submitButton).toHaveLength(1)
    })
    it("handles onClick", () => {
      submitButton.simulate("click")
      expect(onClick).toBeCalled()
    })
    it("type is submit", () => {
      expect(submitButton.prop("type")).toBe("submit")
    })
  })

})