import {fetchData} from "../fetch"
import {sendNotification} from "../notification"

jest.mock("../notification", () => ({sendNotification: jest.fn()}))

describe("fetchData function", () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("catches error", () => {
    const result = fetchData(null)
    expect(sendNotification).toBeCalledWith("error", "Cannot read property 'once' of null")
    expect(result).toEqual(Promise.resolve(false))
  })

  // describe("data fetched", () => {
  //   const fakeRef = firebase.database().ref()


  //   it("don't sort", async () => {
  //     const result = await fetchData(fakeRef)
  //     expect.assertions(1)
  //     expect(result).toEqual(fakeDatabase)
  //   })

  //   it("sort", async () => {
  //     const result = await fetchData(fakeRef, true)
  //     expect.assertions(1)
  //     expect(result).toEqual({fake:[{order:0},{order:1}]})
  //   })
  // })
})

// describe("subscribeToDatabase function", () => {
//   const fakeRef = firebase.database().ref()
//   const fakeCallback = jest.fn()

//   beforeEach(() => {
//     jest.resetAllMocks()
//   })

//   it("callback called", () => {
//     subscribeToDatabase(fakeRef, fakeCallback, false)
//     expect(fakeCallback).toBeCalled()
//   })
// })