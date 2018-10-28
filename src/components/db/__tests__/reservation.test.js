import {
  getPrice, isAvailable, isValidReservation
} from "../reservation"
import moment from "../../../lib/moment"

import {sendNotification} from "../notification"
jest.mock("../notification", () => ({sendNotification: jest.fn()}))

describe("getPrice", () => {
  describe("invalid parameters are given", () => {
    describe("return 0", () => {
      test("no parameters", () => {
        expect(getPrice()).toBe(0)
      })

      test("wrong price table", () => {
        expect(getPrice(
          {prices: {table: {"foodService": []}}},
          {
            foodService: "foodService",
            adults: 1,
            children: [],
            from: moment(),
            to: moment().add(1, "day")
          }
        )).toBe(0)
      })
    })
    test("no reservation chosen, return one days price", () => {
      expect(getPrice(
        {prices: {table: {"foodService": [null, [{name: "1 adult", price: 1000}]]}}},
        {
          foodService: "foodService",
          adults: 1,
          children: []
        }
      )).toBe(1000)
    })
  })

  describe("returns price", () => {
    test("1 adult no children, 1 day", () => {
      expect(getPrice(
        {prices: {table: {"foodService": [null, [{name: "1 adult", price: 1000}]]}}},
        {
          foodService: "foodService",
          adults: 1,
          children: [],
          from: moment(),
          to: moment().add(1, "day")
        }
      )).toBe(1000)
    })

    test("1 adult no children, 2 days", () => {
      expect(getPrice(
        {prices: {table: {"foodService": [null, [{name: "1 adult", price: 1000}]]}}},
        {
          foodService: "foodService",
          adults: 1,
          children: [],
          from: moment(),
          to: moment().add(2, "day")
        }
      )).toBe(2000)
    })

    test("1 adult 1 child(6-12), 1 day", () => {
      expect(getPrice(
        {prices: {table: {"foodService": [null, [{}, {name: "1 adult, 1 child", price: 1000}]]}}},
        {
          foodService: "foodService",
          adults: 1,
          children: ["6-12"],
          from: moment(),
          to: moment().add(1, "day")
        }
      )).toBe(1000)
    })

    test("2 adults 2 children(6-12), 1 child(0-6), 2 days", () => {
      expect(getPrice(
        {prices: {table: {"foodService": [null, null, [null, null, {name: "2 adults, 2 children", price: 1000}]]}}},
        {
          foodService: "foodService",
          adults: 2,
          children: ["0-6","6-12","6-12"],
          from: moment(),
          to: moment().add(2, "day")
        }
      )).toBe(2000)
    })

  })
})


describe("isAvailable", () => {
  const roomId = 1
  const start = moment().add(2, "day")
  const end = moment().add(5, "day")
  beforeEach(() => {
    fetch.resetMocks()
  })

  test("return false when overlaps are returned", async () => {
    expect.assertions(2)
    const expected = moment.range(start, end)
    fetch.mockResponseOnce(JSON.stringify([expected]))
    const result = await isAvailable(roomId, start, end)
    expect(result).toBe(false)
    expect(fetch)
      .toBeCalledWith(`https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?roomId=${roomId}`)
  })

  test("return true if no overlaps", async () => {
    expect.assertions(2)
    fetch.mockResponseOnce(JSON.stringify([]))
    const result = await isAvailable(roomId, start, end)
    expect(result).toBe(true)
    expect(fetch)
      .toBeCalledWith(`https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?roomId=${roomId}`)
  })
})


describe("isValidReservation", () => {

  const validReservation = {
    roomId: 1,
    roomLength: 6,
    name: "Name Name",
    email: "email@email.hu",
    tel: "+000-000-000",
    address: "1234 Budapest, Utca utca 1/a",
    from: moment().add(3, "days"),
    to: moment().add(4, "days"),
    message: "Lorem ipsum dolor sit amet,lorem ipsum dolor sit amet,lorem ipsum dolor sit amet,lorem ipsum dolor sit amet.",
    adults: 1,
    children: [],
    foodService: "breakfast"
  }

  describe("returns false", () => {
    test("no parameters", () => {
      expect(isValidReservation()).toBe(false)
      expect(sendNotification).toBeCalledWith("error", "wrong parameters")
    })

    test("no rooms", () => {
      expect(isValidReservation(validReservation, [])).toBe(false)
      expect(sendNotification).toBeCalledWith("error", "wrong parameters")
    })

    test("not enough place in room", () => {
      expect(isValidReservation(validReservation, [{prices:{metadata: {maxPeople: 0}}}])).toBe(false)
      expect(sendNotification).toBeCalled()
    })
    test("invalid reservation", () => {
      expect(isValidReservation({}, 1)).toBe(false)
      expect(sendNotification).toBeCalled()
    })
  })

  describe("returns true", () => {
    test("valid reservation, and there are some rooms", () => {
      expect(isValidReservation(validReservation, [{prices:{metadata: {maxPeople: 3}}}])).toBe(true)
    })
  })
})