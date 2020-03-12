import {Message} from ".."
import {Send} from "../../shared/Form"
import PersonalDetails from "../../shared/PersonalDetails"

window.scrollTo = jest.fn()

describe("Message component", () => {
  const props = {
    updateMessage: jest.fn(),
    message: {subject: "subject", content: "This is a test message."},
    submitMessage: jest.fn()
  }
  const wrapper = shallow(<Message {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("reset scroll", () => {
    expect(window.scrollTo).toBeCalledWith(0,0)
  })

  describe("Events", () => {
    it("clicking on send submits the form", () => {
      wrapper.find(Send).simulate("click", {preventDefault: jest.fn()})
      expect(props.submitMessage).toBeCalled()
    })

    it("changing personal detail propagates", () => {
      const name = "name"
      const value = "value"
      wrapper.find(PersonalDetails).simulate("change", name, value)
      expect(props.updateMessage).toBeCalledWith(name, value)
    })

    it("selecting subject propagates", () => {
      const name = "subject"
      const value = "value"
      wrapper.find("select").simulate("change", {target: {name, value}})
      expect(props.updateMessage).toBeCalledWith(name, value)
    })

    it("writing a message propagates", () => {
      const name = "content"
      const value = "This is a test message."
      wrapper.find("textarea").simulate("change", {target: {name, value}})
      expect(props.updateMessage).toBeCalledWith(name, value)
    })

  })
})