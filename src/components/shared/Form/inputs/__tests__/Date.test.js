import Date from '../Date'

describe("Date component", () => {
  const props = {
    hasFootnote: true,
    label: "label",
    name: "name",
    notification: jest.fn(),
    value: moment().toDate()
  }
  const wrapper = mount(<Date {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })


  describe("Input div", () => {
    const inputDiv = wrapper.findWhere(e => e.hasClass("input-box"))

    it("click send notification", () => {
      inputDiv.simulate("click")
      expect(wrapper.prop("notification")).toBeCalledWith("useCalendarAsInput")
    })

  })

  describe("Input", () => {

    it("inherits right props", () => {
      const input = wrapper.find("input")
      expect(input.prop("id")).toBe(props.name)
      expect(input.prop("name")).toBe(props.name)
      expect(input.prop("readOnly")).toBe(true)
    })

    describe("Value", () => {
      it("formatted date if specified", () => {
        expect(wrapper.find("input").prop("value")).toBe(moment(props.value).format("LL"))
      })

      it("Message if not specified", () => {
        wrapper.setProps({value: null})
        expect(wrapper.find("input").prop("value")).toBe("Nincs megadva")
      })
    })

  })

  describe("Label", () => {

    it("inherits label text", () => {
      expect(wrapper.find("label").prop("children")).toBe(props.label)
    })

    describe("Footnote", () => {
      it("has", () => {
        wrapper.setProps({hasFootnote: true})
        expect(wrapper.find("label").hasClass("footnote-asterix")).toBe(true)
      })
      it("has not", () => {
        wrapper.setProps({hasFootnote: false})
        expect(wrapper.find("label").hasClass("footnote-asterix")).toBe(false)
      })
    })
  })


})