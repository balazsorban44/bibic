import {isValidFeedback, submitFeedback} from "../feedback"
import {sendNotification} from "../notification"


jest.mock("../notification", () => ({sendNotification: jest.fn()}))

jest.mock("../../../lib/firebase", () => ({FEEDBACKS_FS_REF: {doc: jest.fn().mockReturnValue({set: jest.fn().mockResolvedValue(true)})}}))

const validFeedback = {
  id: "id",
  customId: "sz1-2",
  ratings: {
    coffee: 5,
    cleanliness: 5,
    comfort: 5,
    food: 5,
    services: 5,
    staff: 5
  }
}

describe("isValidFeedback function", () => {
  afterEach(() => {jest.resetAllMocks()})
  afterAll(() => jest.resetAllMocks())

  describe("invalid feedback", () => {
    it("returns false", async() => {
      expect(await submitFeedback(null)).toEqual({})
    })
  })

  describe("valid feedback", () => {
    const setLoading = jest.fn()
    it("catch async/await error", async () => {
      expect.assertions(4)
      expect(await submitFeedback(validFeedback, setLoading)).toEqual({error: true})
      expect(setLoading).toBeCalledWith(true)
      expect(setLoading).toBeCalledWith(false)
      expect(sendNotification).toBeCalledWith("error", expect.any(String))
    })

    it("no reservation found", async () => {
      global.fetch = jest.fn().mockImplementationOnce(() => ({json: jest.fn().mockResolvedValueOnce(false)}))
      expect(await submitFeedback(validFeedback, setLoading)).toEqual({error: true})
      expect(setLoading).toBeCalledWith(true)
      expect(setLoading).toBeCalledWith(false)
      expect(sendNotification).toBeCalledWith("no-reservation-found")
    })

    it("reservation found, creating new feedback", async () => {
      expect.assertions(4)
      global.fetch = jest.fn().mockImplementationOnce(() => ({json: jest.fn().mockResolvedValueOnce(true)}))
      const result = await submitFeedback(validFeedback, setLoading)
      expect(result).toEqual({success: true})
      expect(setLoading).toBeCalledWith(true)
      expect(setLoading).toBeCalledWith(false)
      expect(sendNotification).toBeCalledWith("successful-feedback")
    })
  })


})


describe("isValidFeedback function", () => {
  afterEach(() => {jest.resetAllMocks()})
  describe("invalid agrument", () => {
    it("no argument", () => {
      expect(isValidFeedback()).toBe(false)
      expect(sendNotification).toBeCalledWith("error", expect.any(String))
    })

    it("invalid values", () => {
      expect(isValidFeedback({id: 0})).toBe(false)
      expect(sendNotification).toBeCalledWith("error", expect.stringContaining("Érvénytelen"))
    })
  })

  describe("valid argument", () => {
    it("valid feedback", () => {
      expect(isValidFeedback(validFeedback)).toBe(true)
    })
  })
})