import {isEquivalent} from "../compare"

describe("isEquivalent", () => {

  test("{} equals {}", () => expect(isEquivalent({}, {})).toBe(true))
  test("objects with same keys", () => expect(isEquivalent({key: 1}, {key: 1})).toBe(true))
  test("objects with different keys", () => expect(isEquivalent({key: 1}, {key1: 0})).toBe(false))
  test("objects with different values", () => expect(isEquivalent({key: 1}, {key: 0})).toBe(false))
  test("objects with same values", () => expect(isEquivalent({key: 1}, {key1: 1})).toBe(false))

  test("objects have different length", () => expect(isEquivalent({}, {key: 1})).toBe(false))
})