import {
  translations, translate, isQueryString, toPrice
} from "../language"

describe("translations 🌐 ", () => {
  const queryKeys = [
    "roomId",
    "from",
    "to",
    "adults",
    "from",
    "children",
    "foodService",
    "subject"
  ]

  const translationsInURL = []
  const translationsNOTInURL = []
  Object.entries(translations)
    .map(([key, [__, shouldBeInURL]]) => {
      if (shouldBeInURL) {
        translationsInURL.push(key)
      } else {
        translationsNOTInURL.push(key)
      }
    })


  describe("should show up in URL", () => {
    translationsInURL.map(key =>
      test(key, () => expect(queryKeys).toContain(key))
    )
  })
  describe("should not show up in URL", () => {
    translationsNOTInURL.map(key =>
      test(key, () => expect(queryKeys).not.toContain(key))
    )
  })

  describe("translate", () => {
    const keyEnglish = "roomId"
    const keyHungarian = "szoba"
    it("translate to Hungarian 🇭🇺", () => expect(translate(keyEnglish)).toBe(translations[keyEnglish][0]))
    it("translate to English 🇬🇧", () => expect(translate(keyHungarian)).toBe("roomId"))
  })

  describe("isQueryString", () => {
    translationsInURL.map(key => {
      test(`${key} is queryString`, () => expect(isQueryString(key)).toBe(true))
    })
    translationsNOTInURL.map(key => {
      test(`${key} is queryString`, () => expect(isQueryString(key)).toBe(false))
    })
    it("key has no translation returns false", () => expect(isQueryString("")).toBe(false))
  })
})


describe("toPrice", () => {
  it("invalid value returns HUF 0", () => {
    expect(toPrice(NaN).replace(/\s/g, ' ')).toBe("HUF 0")
  })
  it("100000 returns HUF 100,000", () => {
    expect(toPrice(100000).replace(/\s/g, ' ')).toBe("HUF 100,000")
  })

  it("1.0 returns HUF 1", () => {
    expect(toPrice(1.0).replace(/\s/g, ' ')).toBe("HUF 1")
  })

  it("3/2 returns HUF 2", () => {
    expect(toPrice(3/2).replace(/\s/g, ' ')).toBe("HUF 2")
  })
})