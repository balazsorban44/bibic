import {submitMessage, isValidMessage} from "../message"
import {sendNotification} from "../notification"


jest.mock("../notification", () => ({sendNotification: jest.fn()}))


const validMessage = {
  subject: "other",
  email: "email@email.com",
  tel: "+36301234567",
  address: "1234 Budapest, Fő utca 1/a",
  content: "This is a test message that is more than 40 characters long, which is set as the minimum number of characters for the content."
}

describe("isValidMessage", () => {

  describe("invalid message", () => {
    let isValid

    beforeEach(() => {
      isValid = isValidMessage({})
    })

    afterEach(() => {
      jest.resetAllMocks()
    })


    it("returns false", () => {
      expect(isValid).toBe(false)
    })

    it("sends notification", () => {
      expect(sendNotification).toBeCalled()
    })
  })

  describe("valid message", () => {

    it("returns true", () => {
      const isValid = isValidMessage(validMessage)
      expect(isValid).toBe(true)
    })
  })
})


describe("submitMessage", () => {
  const messageLoading = jest.fn()
  const resetMessage = jest.fn()
  const closeMessage = jest.fn()


  describe("invalid message", () => {

    afterAll(() => {
      jest.resetAllMocks()
    })

    it("returns false", () => {
      expect(submitMessage({}, messageLoading, resetMessage, closeMessage)).toBe(false)
    })

    it("message do not load anymore", () => {
      expect(messageLoading).toBeCalledWith(false)
    })
  })

  describe("valid message", () => {

    let isSubmitted

    beforeAll(async () => {
      isSubmitted = await submitMessage(validMessage, messageLoading, resetMessage, closeMessage)
    })

    afterAll(() => {
      jest.resetAllMocks()
    })

    it("message is submitting", () => {
      expect(messageLoading).toBeCalledWith(true)
    })

    describe("successful submitting", () => {

      beforeAll(async () => {
        jest.resetAllMocks()
        jest.useFakeTimers()
        jest.mock("../../../lib/firebase",
          () => ({MESSAGES_FS_REF: {add: () => new Promise(resolve => resolve())}})
        )
        await submitMessage(validMessage, messageLoading, resetMessage, closeMessage)
      })

      afterAll(() => {
        jest.clearAllTimers()
      })

      it("loading is handled", () => {
        expect(messageLoading).toBeCalledTimes(2)
        expect(messageLoading).toBeCalledWith(true)
        expect(messageLoading).toBeCalledWith(false)
      })

      it("send succesful notification", () => {
        expect(sendNotification).toBeCalledWith("messageSuccess")
      })

      it("closes message form", async () => {
        expect.assertions(1)
        await jest.advanceTimersByTime(7500)
        expect(closeMessage).toBeCalled()
      })

      it("resets message form", () => {
        expect.assertions(1)
        expect(resetMessage).toBeCalled()
      })
    })

    describe("catch submit error", () => {

      it("returns false", async () => {
        expect.assertions(1)
        expect(isSubmitted).toBe(false)
      })
      it("sends error notification", async () => {
        expect.assertions(1)
        expect(sendNotification).toBeCalled()
      })

    })
  })
})