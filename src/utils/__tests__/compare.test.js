import {isEquivalent} from "../compare"

describe("isEquivalent", () => {

  it("{} equals {}", () => expect(isEquivalent({}, {})).toBe(true))
  it("objects with same keys", () => expect(isEquivalent({key: 1}, {key: 1})).toBe(true))
  it("objects with different keys", () => expect(isEquivalent({key: 1}, {key1: 0})).toBe(false))
  it("objects with different values", () => expect(isEquivalent({key: 1}, {key: 0})).toBe(false))
  it("objects with same values", () => expect(isEquivalent({key: 1}, {key1: 1})).toBe(false))

  it("objects have different length", () => expect(isEquivalent({}, {key: 1})).toBe(false))
})