import "./"
import {render} from "react-dom"

jest.mock('react-dom', () => ({render: jest.fn()}))

// REVIEW: Add tests
describe("Rendering", () => {
  test("render was called twice", () => expect(render).toBeCalledTimes(1))
})