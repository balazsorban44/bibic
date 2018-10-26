import {
  valid, validateReservation, validateMessage, valueToState
} from "../validate"
import Moment from "moment"
import {extendMoment} from "moment-range"
const moment = extendMoment(Moment)


describe("validate reservation", () => {

  describe("roomId", () => {
    describe("valid 👍", () => {
      test("1 out of 1 room", () => expect(valid.roomId(1, 1)).toBe(true))
      test("2 out of 3 rooms", () => expect(valid.roomId(2, 3)).toBe(true))
    })
    describe("invalid 👎", () => {
      test("0", () => expect(valid.roomId(0, 1)).toBe(false))
      test("undefined", () => expect(valid.roomId(undefined, 1)).toBe(false))
      test("null", () => expect(valid.roomId(null, 1)).toBe(false))
      test("\"\"", () => expect(valid.roomId("", 1)).toBe(false))
    })
  })

  describe("name", () => {
    describe("valid 👍", () => {
      test("Single name", () => expect(valid.name("Name")).toBe(true))
      test("Double name", () => expect(valid.name("Name Name")).toBe(true))
      test("Triple name", () => expect(valid.name("Name Name Name")).toBe(true))
      test("With bullet", () => expect(valid.name("Dr. Name Name")).toBe(true))
      test("With hyphen", () => expect(valid.name("Phd. Name-Name")).toBe(true))
    })
  })

  describe("email", () => {
    describe("valid 👍", () => {
      const email1 = "email@email.hu"
      const email2 = "email-email@email.hu"
      const email3 = "eMail-Email@email.hu"
      const email4 = "eMail.Email@email.hu"
      const email5 = "email+email@email.hu"
      test(email1, () => expect(valid.email(email1)).toBe(true))
      test(email2, () => expect(valid.email(email2)).toBe(true))
      test(email3, () => expect(valid.email(email3)).toBe(true))
      test(email4, () => expect(valid.email(email4)).toBe(true))
      test(email5, () => expect(valid.email(email5)).toBe(true))
    })

    describe("invalid 👎", () => {
      const email1 = "emailemail.hu"
      const email2 = "email@emailhu"
      test(email1, () => expect(valid.email(email1)).toBe(false))
      test(email2, () => expect(valid.email(email2)).toBe(false))
      test("0", () => expect(valid.email(0)).toBe(false))
    })
  })

  describe("tel", () => {
    describe("valid 👍", () => {
      const tel1 = "000000"
      const tel2 = "+000000"
      const tel3 = "+00 00 00"
      const tel4 = "00-00-00"
      test("0", () => expect(valid.tel(0)).toBe(true))
      test(tel1, () => expect(valid.tel(tel1)).toBe(true))
      test(tel2, () => expect(valid.tel(tel2)).toBe(true))
      test(tel3, () => expect(valid.tel(tel3)).toBe(true))
      test(tel4, () => expect(valid.tel(tel4)).toBe(true))
    })
    describe("invalid 👎", () => {
      test("null", () => expect(valid.tel(null)).toBe(false))
      test("undefined", () => expect(valid.tel(undefined)).toBe(false))
      test("\"\"", () => expect(valid.tel("")).toBe(false))
    })
  })

  describe("address", () => {
    describe("valid 👍", () => {
      const address1 = "Utca utca 1."
      const address2 = "Utca utca 1/a"
      const address3 = "7500 Város, Utca utca 1/a"
      test(address1, () => expect(valid.address(address1)).toBe(true))
      test(address2, () => expect(valid.address(address2)).toBe(true))
      test(address3, () => expect(valid.address(address3)).toBe(true))
    })

    describe("invalid 👎", () => {
      test(":", () => expect(valid.address(":")).toBe(false))
      test("?", () => expect(valid.address("?")).toBe(false))
      test("null", () => expect(valid.address(null)).toBe(false))
      test("undefined", () => expect(valid.address(undefined)).toBe(false))
      test("\"\"", () => expect(valid.address("")).toBe(false))
    })
  })
})


describe("validateReservation", () => {
  const res = {
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
    maxPeople: 3
  }
  describe("invalid 👎", () => {
    test("roomId", () =>
      expect(validateReservation({...res, roomId: 0})).toContain("szobaszám"))

    test("name", () =>
      expect(validateReservation({...res, name: ""})).toContain("név"))

    test("email", () =>
      expect(validateReservation({...res, email: "email@name."})).toContain("e-mail"))

    test("tel", () =>
      expect(validateReservation({...res, tel: ""})).toContain("telefon"))

    test("address", () =>
      expect(validateReservation({...res, address: ""})).toContain("lakcím"))

    test("arrival is too early", () =>
      expect(validateReservation({...res, from: moment()})).toContain("érkezés"))

    test("departure is too early", () =>
      expect(validateReservation({...res, to: moment()})).toContain("távozás"))

    test("period length is less than 1 night", () =>
      expect(validateReservation({...res, to: res.from})).toContain("éjszakát"))

    test("message", () =>
      expect(validateReservation({...res, message: 0})).toContain("üzenet"))

    test("message less than 40 char", () =>
      expect(validateReservation({...res, message: "lorem ipsum"})).toContain("rövid"))

    test("adult is 0", () =>
      expect(validateReservation({...res, adults: 0})).toContain("felnőtt"))

    test("children count is -1", () =>
      expect(validateReservation({...res,
        children: [ {name: "0-6", count: -1} ]})).toContain("gyerek"))

    test("people count is higher than max people", () =>
      expect(validateReservation({...res, adults: 4})).toContain("száma"))

    test("people count is higher than max people 2", () =>
      expect(validateReservation({
        ...res, adults: 1, children: [{name: "0-6", count: 3}]
      })).toContain("száma"))

  })

  test("passed", () =>
    expect(validateReservation(res)).toBe(false))

})


describe("validateReservation", () => {
  const mes = {
    subject: "eventHall",
    name: "Name Name",
    email: "email@email.hu",
    tel: "+000-000-000",
    address: "1234 Budapest, Utca utca 1/a",
    content: "Lorem ipsum dolor sit amet,lorem ipsum dolor sit amet,lorem ipsum dolor sit amet,lorem ipsum dolor sit amet."
  }
  describe("invalid 👎", () => {

    test("subject", () =>
      expect(validateMessage({...mes, subject: "eventhall"})).toContain("téma"))

    test("name", () =>
      expect(validateMessage({...mes, name: ""})).toContain("név"))

    test("email", () =>
      expect(validateMessage({...mes, email: "email@name."})).toContain("e-mail"))

    test("tel", () =>
      expect(validateMessage({...mes, tel: ""})).toContain("telefon"))

    test("address", () =>
      expect(validateMessage({...mes, address: ""})).toContain("lakcím"))

    test("message less than 40 char", () =>
      expect(validateMessage({...mes, content: "lorem ipsum"})).toContain("rövid"))
  })

  test("passed", () => expect(validateMessage(mes)).toBe(false))
})


describe("valueToState", () => {
  describe("roomId", () => {
    test("valid roomId is number", () => expect(valueToState("roomId", "3")).toBe(3))
    test("invalid roomId is null", () => expect(valueToState("roomId", "d")).toBe(null))
  })

  describe("people", () => {
    
    describe("Adults", () => {
      test("minimum is 1", () => expect(valueToState("adults", undefined)).toBe(1))
    })
    
    describe("Children", () => {
      const invalidAgeGroup = "0-12"
      const validAgeGroup = "6-12"
      describe("Invalid", () => {
        test("minimum child is 0", () => {
          expect(valueToState("children", undefined)).toHaveLength(0)
        })
        
        test("mix of valid invalid is 0", () => {
          expect(valueToState("children", [valid, invalidAgeGroup])).toHaveLength(0)
        })
      })
  
      describe("Valid", () => {
        test("always return array of children", () => {
          expect(valueToState("children", validAgeGroup)).toEqual([validAgeGroup])
        })
      })

    })

  })


  describe("dates", () => {
    const date = moment()
    test("arrival is date", () => expect(valueToState("from", date)).toEqual(date.clone().toDate()))
    test("departure is date", () => expect(valueToState("to", date)).toEqual(date.clone().toDate()))
    test("invalid date", () => expect(valueToState("to", "invalid date")).toBeInstanceOf(Date))
  })

  describe("subject", () => {
    const key = "subject"
    const validValues = ["eventHall", "fullHouse", "special", "other"]

    test("invalid returns other", () => expect(valueToState(key, "test")).toBe("other"))

    validValues
      .map(validValue => test(`${validValue} returns ${validValue}`, () => expect(valueToState(key, validValue)).toBe(validValue)))
  })

  describe("food service", () => {
    const key = "foodService"
    const validValues = ["halfBoard", "breakfast"]

    test("invalid returns breakfast", () => expect(valueToState(key, "test")).toBe("breakfast"))

    validValues
      .map(validValue => test(`${validValue} returns ${validValue}`, () => expect(valueToState(key, validValue)).toBe(validValue)))
  })

  describe("default", () => {
    test("not existing key returns undefined", () => expect(valueToState("test", "test")).toBe(undefined))
  })
})