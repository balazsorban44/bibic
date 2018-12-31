import App from "../App"
import {BackMenu} from "../Menu"

import {MemoryRouter} from "react-router"
import {Database} from "../db"
import NotFound from "../NotFound"
import MoreServices from "../MoreServices"
import {Carousel} from "../shared/Carousel"
import Link from "react-router-dom/Link"
import Main from "../Main"

global.scrollTo = jest.fn()

const renderRoutes = path =>
  mount(
    <MemoryRouter initialEntries={[path]}>
      <Database hero={[]}>
        <App/>
      </Database>
    </MemoryRouter>
  )

describe("App component", () => {
  const wrapper = shallow(<App/>)

  it("renders correctly", () => {
    expect(wrapper).toHaveLength(1)
  })

  describe("Back button", () => {
    it("show if not on home page", () => {
      const component = renderRoutes("/random")
      expect(component.find(BackMenu).length).toBe(1)
    })


    it.skip("don't show on home page", () => {
      const component = renderRoutes("/")
      expect(component.find(BackMenu).length).toBe(0)
    })
  })

  describe("Not found", () => {
    it("renders correctly", () => {
      const component = renderRoutes("/a")
      expect(component.find(Link).length).toBe(2)
      expect(component.find(Link).first().prop("to")).toBe("/")
      expect(component.find(Link).last().prop("to")).toBe("/")
    })
  })

  describe("MoreServices", () => {
    it("renders correctly", () => {
      const component = renderRoutes("/szolgaltatasok")
      expect(component.find(MoreServices).length).toBe(1)
    })
  })

  describe("Foods", () => {
    it("renders correctly", () => {
      const component = renderRoutes("/etelek")
      expect(component.find(Carousel).length).toBe(1)
    })
  })

})


describe("Main component", () => {
  const wrapper = shallow(<Main/>)

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})