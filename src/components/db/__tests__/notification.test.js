import {sendNotification} from "../notification"
import {toast} from "react-toastify"

jest.mock("react-toastify", () => ({toast: {
  warn: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
  success: jest.fn()
}}))

describe("sendNotification", () => {

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("the reservation should include at least one night", () => {
    sendNotification("sameDay")
    expect(toast.warn).toBeCalled()
  })

  it("there is an overlap with an existing reservation", () => {
    sendNotification("overlap")
    expect(toast.warn).toBeCalled()
  })

  it("date is selected on the calendar", () => {
    sendNotification("calendarSelectSuccess")
    expect(toast.info).toBeCalled()
  })

  it("should use the date picker", () => {
    sendNotification("useCalendarAsInput")
    expect(toast.warn).toBeCalled()
  })

  it("there was an error in the input", () => {
    sendNotification("wrongInput")
    expect(toast.error).toBeCalled()
  })

  it("reservation successfully submitted", () => {
    sendNotification("reservationSubmitted")
    expect(toast.success).toBeCalled()
  })

  it("message successfully submitted", () => {
    sendNotification("messageSuccess")
    expect(toast.success).toBeCalled()
  })

  it("there was an error", () => {
    sendNotification("error")
    expect(toast.error).toBeCalled()
  })

  it("default case", () => {
    sendNotification("no case")
    expect(toast.info).toBeCalled()
  })
})