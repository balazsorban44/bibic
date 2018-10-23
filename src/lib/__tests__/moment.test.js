import moment from "../moment"

describe("moment", () => {
  test("moment-range added to moment", () => {
    expect(moment).toHaveProperty("range")
  })
  test("language is set to Hungarian", () => {
    expect(moment.locale()).toBe("hu")
  })
})