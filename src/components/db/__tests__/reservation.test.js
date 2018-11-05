import {
  getPrice, isAvailable, isValidReservation, submitReservation, normalizeReservation
} from "../reservation"
import moment from "../../../lib/moment"
import "../../../lib/firebase"
import {sendNotification} from "../notification"

jest.mock("../notification", () => ({sendNotification: jest.fn()}))

jest.mock('../../../lib/firebase', () => ({RESERVATIONS_FS_REF: {add: () => new Promise(resolve => resolve())}
  , TIMESTAMP: jest.fn()}))

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


describe("getPrice", () => {
  describe("invalid parameters are given", () => {
    describe("return 0", () => {
      it("no parameters", () => {
        expect(getPrice()).toBe(0)
      })

      it("wrong price table", () => {
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
    it("no reservation chosen, return one days price", () => {
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
    it("1 adult no children, 1 day", () => {
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

    it("1 adult no children, 2 days", () => {
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

    it("1 adult 1 child(6-12), 1 day", () => {
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

    it("2 adults 2 children(6-12), 1 child(0-6), 2 days", () => {
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
  const range = moment.range(start, end)

  beforeEach(() => {
    fetch.resetMocks()
  })

  it("return false when overlaps are returned", async () => {
    expect.assertions(2)
    fetch.mockResponseOnce(JSON.stringify([range]))
    const result = await isAvailable(roomId, range)
    expect(result).toBe(false)
    expect(fetch)
      .toBeCalledWith(`https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?roomId=${roomId}`)
  })

  it("return true if no overlaps", async () => {
    expect.assertions(2)
    fetch.mockResponseOnce(JSON.stringify([]))
    const result = await isAvailable(roomId, range)
    expect(result).toBe(true)
    expect(fetch)
      .toBeCalledWith(`https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?roomId=${roomId}`)
  })
})


describe("isValidReservation", () => {

  describe("returns false", () => {
    it("no parameters", () => {
      expect(isValidReservation()).toBe(false)
      expect(sendNotification).toBeCalledWith("error", "wrong parameters")
    })

    it("no rooms", () => {
      expect(isValidReservation(validReservation, [])).toBe(false)
      expect(sendNotification).toBeCalledWith("error", "wrong parameters")
    })

    it("not enough place in room", () => {
      expect(isValidReservation(validReservation, [{prices:{metadata: {maxPeople: 0}}}])).toBe(false)
      expect(sendNotification).toBeCalled()
    })
    it("invalid reservation", () => {
      expect(isValidReservation({}, 1)).toBe(false)
      expect(sendNotification).toBeCalled()
    })
  })

  describe("returns true", () => {
    it("valid reservation, and there are some rooms", () => {
      expect(isValidReservation(validReservation, [{prices:{metadata: {maxPeople: 3}}}])).toBe(true)
    })
  })
})

describe("submitReservation", () => {
  const isReserving = jest.fn()
  const reservReservation = jest.fn()
  const closeReservation = jest.fn()


  describe("invalid reservation", () => {
    let isSubmitted
    beforeEach(() => {
      isSubmitted = submitReservation({}, isReserving, reservReservation, closeReservation, [])
    })

    it("isReserving set to false", () => {
      expect(isReserving).toBeCalledWith(false)
    })
    it("returns false", () => {
      expect(isSubmitted).toBe(false)
    })
  })

  describe("valid reservation", () => {
    const rooms = [{id: 1, prices: {metadata: {maxPeople: 5}}}]

    it("isReserving set to true", async () => {
      fetch.mockResponseOnce(JSON.stringify([]))
      await submitReservation(validReservation, isReserving, reservReservation, closeReservation, rooms)
      expect(isReserving).toBeCalledWith(true)
      fetch.resetMocks()
    })


    describe("there are overlaps", () => {

      beforeAll(() => {
        fetch.mockResponse(JSON.stringify([validReservation.from, validReservation.to]))
      })

      afterAll(() => {
        fetch.resetMocks()
      })

      it("no longer reserving", async () => {
        expect.assertions(2)
        await submitReservation(validReservation, isReserving, reservReservation, closeReservation, rooms)
        expect(isReserving).toBeCalledWith(true)
        expect(isReserving).toBeCalledWith(false)
      })

      it("notification is sent", async () => {
        expect.assertions(1)
        await submitReservation(validReservation, isReserving, reservReservation, closeReservation, rooms)
        expect(sendNotification).toBeCalledWith("overlap")
      })

      /*
       * it("returns false", async () => {
       *   expect.assertions(1)
       *   expect(isSubmitted).toBe(false)
       * })
       */

    })


    /*
     * describe("there is no overlaps", () => {
     * let isSubmitted
     *   beforeEach(() => {
     *     fetch.mockResponseOnce(JSON.stringify([]))
     *     isSubmitted = submitReservation(validReservation, isReserving, reservReservation, closeReservation, rooms)
     *   })
     *   it("returns true", () => {
     *     expect(isSubmitted).toBe(true)
     *   })
     * })
     */


  })
})


describe("normalizeReservation normalizes", () => {
  const from = moment()
  const to = moment()
  const reservation = {
    children: ["0-6", "6-12", "0-6"], from, to, message: ""
  }

  it("message", () => {
    const {message: normalizedMessage} = normalizeReservation(reservation)
    expect(normalizedMessage).toBe("Nincs üzenet")

    const {message: normalizedMessage2} = normalizeReservation({...reservation, message: "message"})
    expect(normalizedMessage2).toBe("message")
  })

  it("children", () => {
    const {children: normalizedChildren} = normalizeReservation(reservation)
    expect(normalizedChildren).toEqual([{name: "0-6", count: 2}, {name: "6-12", count: 1}])
  })

  it("start date", () => {
    const {from: normalizedFrom} = normalizeReservation(reservation)
    expect(moment(normalizedFrom).isSame(from, "day") && moment(normalizedFrom).hour() === 14).toBe(true)
  })

  it("end date", () => {
    const {to: normalizedTo} = normalizeReservation(reservation)
    expect(moment(normalizedTo).isSame(to, "day") && moment(normalizedTo).hour() === 10).toBe(true)
  })
})