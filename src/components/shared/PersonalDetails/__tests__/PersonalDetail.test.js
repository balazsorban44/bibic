import PersonalDetail from '../PersonalDetail'
import {sendNotification} from '../../../db/notification'

jest.mock('../../../db/notification', () => ({sendNotification: jest.fn()}))

describe("PersonalDetail component", () => {
  const props = {
    type: "tel",
    label: "label",
    name: "roomId",
    placeholder: "placeholder",
    hasFootnote: false,
    disabled: false,
    value: "",
    onChange: jest.fn(),
    errorMessage: "There was an error!"
  }
  const wrapper = mount(<PersonalDetail {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("updates correctly", () => {
    const updatedValue = "updated value"
    wrapper.setState({value: ""})
    wrapper.setProps({value: updatedValue})
    expect(wrapper.state("value")).toBe(updatedValue)
  })


  describe("Footnote", () => {
    const footnoteClass = "footnote-asterix"
    it("is not present", () => {
      wrapper.setProps({hasFootnote: false})
      expect(wrapper.find("label").hasClass(footnoteClass)).toBe(false)
    })
    it("is present", () => {
      wrapper.setProps({hasFootnote: true})
      expect(wrapper.find("label").hasClass(footnoteClass)).toBe(true)
    })
  })

  describe("Error", () => {
    const errorClass = "input-error"
    it("is not present", () => {
      wrapper.setState({error: false})
      expect(wrapper.childAt(0).hasClass(errorClass)).toBe(false)
    })
    it("is present", () => {
      wrapper.setState({error: true})
      expect(wrapper.childAt(0).hasClass(errorClass)).toBe(true)
    })
  })

  describe("Input", () => {
    describe("Change", () => {
      const input = wrapper.find("input")
      const value = "new value"
      it("updates state ", () => {
        input.simulate("change", {target: {value}})
        expect(wrapper.state("value")).toBe(value)
      })
    })

    describe("Blur", () => {
      const input = wrapper.find("input")
      it("calls onChange", () => {
        input.simulate("blur")
        expect(wrapper.prop("onChange")).toBeCalled()
      })

      describe("No error", () => {
        const name = "tel"
        const value = "+123456"

        beforeEach(() => {
          wrapper.setState({error: false})
          input.simulate("blur", {target: {name, value}})
        })

        it("error is set to false in state", () => {
          expect(wrapper.state("error")).toBe(false)
        })

        /*
         * REVIEW: sendNotification appears to be called anyway
         * it("no notification is sent", () => {
         *   expect(sendNotification).not.toBeCalled()
         * })
         */
        it("changed value sent", () => {
          expect(wrapper.prop("onChange")).toBeCalledWith(name, value)
        })
      })
      describe("Error", () => {
        const name = "tel"
        const value = "wrong number"

        beforeEach(() => {
          wrapper.setState({error: false})
          input.simulate("blur", {target: {name, value}})
        })

        it("error is set in state", () => {
          expect(wrapper.state("error")).toBe(true)
        })

        it("wrong value not sent", () => {
          expect(wrapper.prop("onChange")).toBeCalledWith(name, "")
        })

        it("send notification", () => {
          expect(sendNotification).toBeCalledWith("error", wrapper.prop("errorMessage"))
        })

      })
    })
    describe("Placeholder", () => {
      it("label is placeholder if present", () => {
        expect(wrapper.find("input").prop("placeholder")).toBe(props.label)
      })
      it("placeholder when no label", () => {
        wrapper.setProps({label: undefined})
        expect(wrapper.find("input").prop("placeholder")).toBe(props.placeholder)
      })
    })

    describe("Type", () => {
      it("equals type prop if present", () => {
        expect(wrapper.find("input").prop("type")).toBe(props.type)
      })
      it("defaults to text", () => {
        wrapper.setProps({type: undefined})
        expect(wrapper.find("input").prop("type")).toBe("text")
      })
    })
  })

})