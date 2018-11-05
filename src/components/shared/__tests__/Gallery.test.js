import {Gallery, GalleryItem} from "../Gallery"


describe("GalleryItem component", () => {
  const props = {
    title: "title",
    desc: "desc",
    SIZE_640: "SIZE_640.jpg",
    SIZE_1024: "SIZE_1024.jpg",
    SIZE_1440: "SIZE_1440.jpg"
  }
  const wrapper = shallow(<GalleryItem {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe("source images are defined", () => {
    it("<960px", () => {
      expect(wrapper.findWhere(e => e.prop("srcSet") === props.SIZE_1024).length).toBe(1)
    })
    it("<1280px", () => {
      expect(wrapper.findWhere(e => e.prop("srcSet") === props.SIZE_1440).length).toBe(1)
    })
    describe("default image", () => {
      it("has src", () => {
        expect(wrapper.find("img").prop("src")).toBe(props.SIZE_640)
      })

      it("alt is desc", () => {
        expect(wrapper.find("img").prop("alt")).toBe(props.desc)
      })
      it("default alt is title", () => {
        wrapper.setProps({desc: ""})
        expect(wrapper.find("img").prop("alt")).toBe(props.title)
      })
    })
  })

})

describe("Gallery component", () => {
  const props = {galleries: {}}
  const wrapper = shallow(<Gallery {...props}/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  it("renders elements", () => {
    wrapper.setProps({galleries: {path: [0,1]}, path: "path"})
    expect(wrapper.find(".gallery").prop("children").length).toBe(2)
  })

  it("renders custom elements", () => {
    wrapper.setProps({
      galleries: {path: [0,1]}, path: "path", item: GalleryItem
    })
    expect(wrapper.prop("children").length).toBe(2)
  })

  it("renders custom wrapper", () => {
    wrapper.setProps({
      galleries: {path: [0,1,2]}, path: "path", component: ({children}) => <div className="custom-wrapper">{children}</div>
    })
    expect(wrapper.prop("children").length).toBe(3)
  })
})

