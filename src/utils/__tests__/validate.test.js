import {
  valid, validateReservation, validateMessage, valueToState
} from "../validate"


describe("validate reservation", () => {

  describe("roomId", () => {
    describe("valid 👍", () => {
      it("1 out of 1 room", () => expect(valid.roomId(1, 1)).toBe(true))
      it("2 out of 3 rooms", () => expect(valid.roomId(2, 3)).toBe(true))
    })
    describe("invalid 👎", () => {
      it("0", () => expect(valid.roomId(0, 1)).toBe(false))
      it("undefined", () => expect(valid.roomId(undefined, 1)).toBe(false))
      it("null", () => expect(valid.roomId(null, 1)).toBe(false))
      it("\"\"", () => expect(valid.roomId("", 1)).toBe(false))
    })
  })

  describe("name", () => {
    describe("valid 👍", () => {
      it("Single name", () => expect(valid.name("Name")).toBe(true))
      it("Double name", () => expect(valid.name("Name Name")).toBe(true))
      it("Triple name", () => expect(valid.name("Name Name Name")).toBe(true))
      it("With bullet", () => expect(valid.name("Dr. Name Name")).toBe(true))
      it("With hyphen", () => expect(valid.name("Phd. Name-Name")).toBe(true))
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
      it("0", () => expect(valid.email(0)).toBe(false))
    })
  })

  describe("tel", () => {
    describe("valid 👍", () => {
      const tel1 = "000000"
      const tel2 = "+000000"
      const tel3 = "+00 00 00"
      const tel4 = "00-00-00"
      it("0", () => expect(valid.tel(0)).toBe(true))
      test(tel1, () => expect(valid.tel(tel1)).toBe(true))
      test(tel2, () => expect(valid.tel(tel2)).toBe(true))
      test(tel3, () => expect(valid.tel(tel3)).toBe(true))
      test(tel4, () => expect(valid.tel(tel4)).toBe(true))
    })
    describe("invalid 👎", () => {
      it("null", () => expect(valid.tel(null)).toBe(false))
      it("undefined", () => expect(valid.tel(undefined)).toBe(false))
      it("\"\"", () => expect(valid.tel("")).toBe(false))
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
      it(":", () => expect(valid.address(":")).toBe(false))
      it("?", () => expect(valid.address("?")).toBe(false))
      it("null", () => expect(valid.address(null)).toBe(false))
      it("undefined", () => expect(valid.address(undefined)).toBe(false))
      it("\"\"", () => expect(valid.address("")).toBe(false))
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
    it("roomId", () =>
      expect(validateReservation({...res, roomId: 0})).toContain("szobaszám"))

    it("name", () =>
      expect(validateReservation({...res, name: ""})).toContain("név"))

    it("email", () =>
      expect(validateReservation({...res, email: "email@name."})).toContain("e-mail"))

    it("tel", () =>
      expect(validateReservation({...res, tel: ""})).toContain("telefon"))

    it("address", () =>
      expect(validateReservation({...res, address: ""})).toContain("lakcím"))

    it("arrival is too early", () =>
      expect(validateReservation({...res, from: moment()})).toContain("érkezés"))

    it("departure is too early", () =>
      expect(validateReservation({...res, to: moment()})).toContain("távozás"))

    it("period length is less than 1 night", () =>
      expect(validateReservation({...res, to: res.from})).toContain("éjszakát"))

    it("message", () =>
      expect(validateReservation({...res, message: 0})).toContain("üzenet"))

    it("message less than 40 char", () =>
      expect(validateReservation({...res, message: "lorem ipsum"})).toContain("rövid"))

    it("adult is 0", () =>
      expect(validateReservation({...res, adults: 0})).toContain("felnőtt"))

    it("children count is -1", () =>
      expect(validateReservation({...res,
        children: [ {name: "0-6", count: -1} ]})).toContain("gyerek"))

    it("people count is higher than max people", () =>
      expect(validateReservation({...res, adults: 4})).toContain("száma"))

    it("people count is higher than max people 2", () =>
      expect(validateReservation({
        ...res, adults: 1, children: [{name: "0-6", count: 3}]
      })).toContain("száma"))

  })

  it("passed", () =>
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

    it("subject", () =>
      expect(validateMessage({...mes, subject: "eventhall"})).toContain("téma"))

    it("name", () =>
      expect(validateMessage({...mes, name: ""})).toContain("név"))

    it("email", () =>
      expect(validateMessage({...mes, email: "email@name."})).toContain("e-mail"))

    it("tel", () =>
      expect(validateMessage({...mes, tel: ""})).toContain("telefon"))

    it("address", () =>
      expect(validateMessage({...mes, address: ""})).toContain("lakcím"))

    it("message less than 40 char", () =>
      expect(validateMessage({...mes, content: "lorem ipsum"})).toContain("rövid"))
  })

  it("passed", () => expect(validateMessage(mes)).toBe(false))
})


describe("valueToState", () => {
  describe("roomId", () => {
    it("valid roomId is number", () => expect(valueToState("roomId", "3")).toBe(3))
    it("invalid roomId is null", () => expect(valueToState("roomId", "d")).toBe(null))
  })

  describe("people", () => {

    describe("Adults", () => {
      it("minimum is 1", () => expect(valueToState("adults", undefined)).toBe(1))
    })

    describe("Children", () => {
      const invalidAgeGroup = "0-12"
      const validAgeGroup = "6-12"
      describe("Invalid", () => {
        it("minimum child is 0", () => {
          expect(valueToState("children", undefined)).toHaveLength(0)
        })

        it("mix of valid invalid is 0", () => {
          expect(valueToState("children", [valid, invalidAgeGroup])).toHaveLength(0)
        })
      })

      describe("Valid", () => {
        it("always return array of children", () => {
          expect(valueToState("children", validAgeGroup)).toEqual([validAgeGroup])
        })
      })

    })

  })


  describe("dates", () => {
    const date = moment()
    it("arrival is date", () => expect(valueToState("from", date)).toEqual(date.clone().toDate()))
    it("departure is date", () => expect(valueToState("to", date)).toEqual(date.clone().toDate()))
    it("invalid date", () => expect(valueToState("to", "invalid date")).toBeInstanceOf(Date))
  })

  describe("subject", () => {
    const key = "subject"
    const validValues = ["eventHall", "fullHouse", "special", "other"]

    it("invalid returns other", () => expect(valueToState(key, "test")).toBe("other"))

    validValues
      .map(validValue => test(`${validValue} returns ${validValue}`, () => expect(valueToState(key, validValue)).toBe(validValue)))
  })

  describe("food service", () => {
    const key = "foodService"
    const validValues = ["halfBoard", "breakfast"]

    it("invalid returns breakfast", () => expect(valueToState(key, "test")).toBe("breakfast"))

    validValues
      .map(validValue => test(`${validValue} returns ${validValue}`, () => expect(valueToState(key, validValue)).toBe(validValue)))
  })

  describe("default", () => {
    it("not existing key returns undefined", () => expect(valueToState("test", "test")).toBe(undefined))
  })
})