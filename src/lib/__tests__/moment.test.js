import moment from "../moment"

describe("moment", () => {
  it("moment-range added to moment", () => {
    expect(moment).toHaveProperty("range")
  })
  it("language is set to Hungarian", () => {
    expect(moment.locale()).toBe("hu")
  })
})