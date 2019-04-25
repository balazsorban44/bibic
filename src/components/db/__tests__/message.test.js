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


  it("invalid message handled", async () => {
    expect.assertions(2)
    const result = await submitMessage({}, messageLoading, resetMessage, closeMessage)
    expect(result).toBe(false)
    expect(messageLoading).toBeCalledWith(false)
  })

  describe("valid message handled", () => {


    // it("catches errors", async () => {
    //   expect.assertions(2)
    //   jest.mock("../../../lib/firebase", () => ({MESSAGES_FS_REF: {add: () => Promise.reject({message: "ERROR"})}}))

    //   const result = await submitMessage(validMessage, messageLoading, resetMessage, closeMessage)
    //   expect(sendNotification).toBeCalledWith("error", "ERROR")
    //   expect(result).toBe(false)
    // })

    it("no errors", async () => {
      jest.mock("../../../lib/firebase", () => ({MESSAGES_FS_REF: {add: () => Promise.resolve()}}))

      jest.useFakeTimers()
      expect.assertions(4)
      const result = await submitMessage(validMessage, messageLoading, resetMessage, closeMessage)
      expect(sendNotification).toBeCalledWith("messageSuccess")
      expect(result).toBe(true)
      jest.advanceTimersByTime(7500)
      expect(resetMessage).toBeCalled()
      expect(closeMessage).toBeCalled()
      jest.clearAllTimers()
    })
  })


})