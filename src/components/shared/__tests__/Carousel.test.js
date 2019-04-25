import {Carousel, CarouselItem} from "../Carousel"

global.scrollTo = jest.fn()

describe("Carousel component", () => {
  const props = {galleries: {}, match: {path: "/path"}}
  const wrapper = shallow(<Carousel {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("scrolled to top", () => {
    expect(scrollTo).toBeCalledWith(0,0)
  })

  it("section gets right id", () => {
    expect(wrapper.find("section").prop("id")).toBe(props.match.path.replace("/", ""))
  })
})


describe("CarouselItem component", () => {
  const props = {
    className: "className",
    title: "title",
    desc: "desc",
    SIZE_640: "SIZE_640.jpg",
    SIZE_1024: "SIZE_1024.jpg",
    SIZE_1440: "SIZE_1440.jpg",
    SIZE_ORIGINAL: "SIZE_ORIGINAL.jpg",
    itemClassName: "fake-classname"
  }
  const wrapper = shallow(<CarouselItem {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("inherits classname", () => {
    expect(wrapper.prop("classname")).toBe(props.classname)
  })

  it("title shown", () => {
    expect(wrapper.find("h4").prop("children")).toBe(props.title)
  })

  it("description shown", () => {
    expect(wrapper.find("p").prop("children")).toBe(props.desc)
  })

  describe("source images are defined", () => {
    it("<640px", () => {
      expect(wrapper.findWhere(e => e.prop("srcSet") === props.SIZE_640).length).toBe(1)
    })
    it("<1280px", () => {
      expect(wrapper.findWhere(e => e.prop("srcSet") === props.SIZE_1024).length).toBe(1)
    })
    it("<1920px", () => {
      expect(wrapper.findWhere(e => e.prop("srcSet") === props.SIZE_1440).length).toBe(1)
    })

    it("default image", () => {
      expect(wrapper.find(".carousel-item-img img").prop("src")).toBe(props.SIZE_ORIGINAL)
    })
  })

})