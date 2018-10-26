import Services, {ServiceItem} from "../Services"

describe("Services component", () => {
  const wrapper = shallow(<Services/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

})

describe("ServiceItem component", () => {
  const props = {
    SIZE_1024: "SIZE_1024.jpg",
    SIZE_1440: "SIZE_1440.jpg",
    SIZE_640: "SIZE_640.jpg",
    desc: "desc",
    title: "title"
  }
  const wrapper = shallow(<ServiceItem {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })


  it("renders description", () => {
    expect(wrapper.find("p").prop("children")).toBe(props.desc)
  })

  it("renders default img", () => {
    expect(wrapper.find("img").prop("src")).toBe(props.SIZE_640)
  })

  describe("Img", () => {
    it("alt is description", () => {
      expect(wrapper.find("img").prop("alt")).toBe(props.desc)
    })
    it("default alt is title", () => {
      wrapper.setProps({desc: ""})
      expect(wrapper.find("img").prop("alt")).toBe(props.title)
    })
  })

  describe("sources", () => {
    it("source 1", () => {
      expect(wrapper.findWhere(e => e.type() === "source" && e.prop("srcSet") === props.SIZE_1024)).toHaveLength(1)
    })

    it("source 2", () => {
      expect(wrapper.findWhere(e => e.type() === "source" && e.prop("srcSet") === props.SIZE_1440)).toHaveLength(1)
    })

  })


})