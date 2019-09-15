import BackButton from "./BackButton"
import {render} from "utils/test"

describe("BackButton", () => {

  it("default to homepage", () => {
    const {container} = render(<BackButton/>)
    expect(container).toMatchSnapshot()
    expect(container).toHaveTextContent(/back.*to.*home/i)
  })

  it("custom", () => {
    // Custom return i.e. back button will go to another page than homepage
    const custom = "custom"
    const {container} = render(<BackButton />, {router: {initialEntries: [`something/?vissza=${custom}`]}})
    expect(container).toHaveTextContent(custom)
  })
})
